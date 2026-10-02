import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db, ClientRegistration } from '../firebase';

const LOCAL_STORAGE_KEY = 'trade_claim_registered_clients';

// Helper to format date string
export function formatDate(date: Date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Save registration record to Firestore with localStorage backup
export async function saveClientRegistration(data: Omit<ClientRegistration, 'registeredAt'> & { registeredAt?: string }): Promise<void> {
  const registeredAt = data.registeredAt || formatDate();
  const record: ClientRegistration = {
    ...data,
    registeredAt,
  };

  // 1. Save to localStorage backup
  try {
    const existing = getLocalClients();
    const filtered = existing.filter((c) => c.email !== record.email && c.accountId !== record.accountId);
    const updated = [record, ...filtered];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save to localStorage:', err);
  }

  // 2. Save to Firestore collection 'clients'
  try {
    const docId = record.uid || record.accountId || `${Date.now()}`;
    const clientRef = doc(db, 'clients', docId);
    await setDoc(clientRef, {
      ...record,
      timestamp: serverTimestamp(),
    }, { merge: true });
  } catch (firestoreErr) {
    console.warn('Firestore write warning (using local backup):', firestoreErr);
  }
}

// Get all clients from local cache
export function getLocalClients(): ClientRegistration[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Fetch all registered clients from Firestore (with local fallback/merge)
export async function fetchAllClients(): Promise<ClientRegistration[]> {
  const localList = getLocalClients();

  try {
    const clientsRef = collection(db, 'clients');
    const q = query(clientsRef);
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const firestoreList: ClientRegistration[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as ClientRegistration;
        firestoreList.push({
          id: docSnap.id,
          ...data,
        });
      });

      // Merge firestore with local list by email/id
      const mergedMap = new Map<string, ClientRegistration>();
      localList.forEach((c) => mergedMap.set(c.email || c.accountId, c));
      firestoreList.forEach((c) => mergedMap.set(c.email || c.accountId, c));

      const merged = Array.from(mergedMap.values());
      // Sort newest first
      merged.sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime());
      return merged;
    }
  } catch (err) {
    console.warn('Firestore fetch warning, falling back to local storage:', err);
  }

  return localList;
}

// Real-time listener for registered clients
export function subscribeToClients(callback: (clients: ClientRegistration[]) => void): () => void {
  // Call initially with local clients
  callback(getLocalClients());

  try {
    const clientsRef = collection(db, 'clients');
    const unsubscribe = onSnapshot(
      clientsRef,
      (snapshot) => {
        const firestoreList: ClientRegistration[] = [];
        snapshot.forEach((docSnap) => {
          firestoreList.push({
            id: docSnap.id,
            ...(docSnap.data() as ClientRegistration),
          });
        });

        // Merge with local clients
        const localList = getLocalClients();
        const mergedMap = new Map<string, ClientRegistration>();
        localList.forEach((c) => mergedMap.set(c.email || c.accountId, c));
        firestoreList.forEach((c) => mergedMap.set(c.email || c.accountId, c));

        const merged = Array.from(mergedMap.values());
        merged.sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime());
        callback(merged);
      },
      (error) => {
        console.warn('Real-time listener warning, using local cache:', error);
        callback(getLocalClients());
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Failed to attach snapshot listener:', err);
    return () => {};
  }
}
