import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

// Your web app's Firebase configuration provided by client
export const firebaseConfig = {
  apiKey: "AIzaSyDHJLgEbQSyP-SUYedLyoL7vm8vrraUIR8",
  authDomain: "tradebase-fd29d.firebaseapp.com",
  projectId: "tradebase-fd29d",
  storageBucket: "tradebase-fd29d.firebasestorage.app",
  messagingSenderId: "359428524582",
  appId: "1:359428524582:web:acdc1259e160e34bdf34e7",
  measurementId: "G-J7EW11XDVW",
};

// Initialize Firebase
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Authorized Developer Admin Email
export const DEVELOPER_ADMIN_EMAIL = 'nexcraftsystems@gmail.com';

export interface ClientRegistration {
  id?: string;
  uid?: string;
  name: string;
  email: string;
  telegramUser: string;
  broker: string;
  accountId: string;
  targetLots: string;
  authProvider: 'google.com' | 'password' | string;
  registeredAt: string;
  timestamp?: any;
}
