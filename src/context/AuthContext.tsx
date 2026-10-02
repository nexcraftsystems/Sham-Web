import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider, DEVELOPER_ADMIN_EMAIL, ClientRegistration } from '../firebase';
import { saveClientRegistration, getLocalClients, formatDate } from '../services/database';

interface AuthContextType {
  currentUser: User | null;
  clientProfile: ClientRegistration | null;
  isRegistered: boolean;
  isAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<User>;
  registerWithEmail: (email: string, pass: string, profile: Omit<ClientRegistration, 'email' | 'authProvider' | 'registeredAt'>) => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  saveProfile: (profile: Omit<ClientRegistration, 'email' | 'authProvider' | 'registeredAt'>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_PROFILE_KEY = 'trade_claim_current_profile';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [clientProfile, setClientProfile] = useState<ClientRegistration | null>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_PROFILE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const isAdmin = currentUser?.email?.toLowerCase() === DEVELOPER_ADMIN_EMAIL.toLowerCase();
  const isRegistered = !!clientProfile && !!clientProfile.accountId;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        // Look up profile if not loaded
        const localList = getLocalClients();
        const found = localList.find((c) => c.email?.toLowerCase() === user.email?.toLowerCase());
        if (found) {
          setClientProfile(found);
          localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(found));
        } else if (!clientProfile && user.displayName) {
          // Pre-populate partial profile
          const partial: ClientRegistration = {
            uid: user.uid,
            name: user.displayName || '',
            email: user.email || '',
            telegramUser: '',
            broker: 'Exness',
            accountId: '',
            targetLots: '500 Lots',
            authProvider: user.providerData[0]?.providerId || 'google.com',
            registeredAt: formatDate(),
          };
          setClientProfile(partial);
          localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(partial));
        }
      } else {
        // Keep clientProfile from localStorage if trader registered without ongoing Firebase session
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User> => {
    const cred = await signInWithPopup(auth, googleProvider);
    const user = cred.user;

    // Check if profile exists
    const localList = getLocalClients();
    const existing = localList.find((c) => c.email?.toLowerCase() === user.email?.toLowerCase());

    if (existing) {
      setClientProfile(existing);
      localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(existing));
    } else {
      const newProfile: ClientRegistration = {
        uid: user.uid,
        name: user.displayName || user.email?.split('@')[0] || 'Trader',
        email: user.email || '',
        telegramUser: '',
        broker: 'Exness',
        accountId: '',
        targetLots: '500 Lots',
        authProvider: 'google.com',
        registeredAt: formatDate(),
      };
      setClientProfile(newProfile);
      localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(newProfile));
    }

    return user;
  };

  const registerWithEmail = async (
    email: string,
    pass: string,
    profileData: Omit<ClientRegistration, 'email' | 'authProvider' | 'registeredAt'>
  ) => {
    let user: User | null = null;
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      user = cred.user;
    } catch (err: any) {
      // If email already in use, try signing in
      if (err.code === 'auth/email-already-in-use') {
        const cred = await signInWithEmailAndPassword(auth, email, pass);
        user = cred.user;
      } else {
        throw err;
      }
    }

    const fullProfile: ClientRegistration = {
      ...profileData,
      uid: user?.uid,
      email,
      authProvider: 'password',
      registeredAt: formatDate(),
    };

    setClientProfile(fullProfile);
    localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(fullProfile));
    await saveClientRegistration(fullProfile);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    const user = cred.user;

    const localList = getLocalClients();
    const existing = localList.find((c) => c.email?.toLowerCase() === user.email?.toLowerCase());
    if (existing) {
      setClientProfile(existing);
      localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(existing));
    }
  };

  const saveProfile = async (profileData: Omit<ClientRegistration, 'email' | 'authProvider' | 'registeredAt'>) => {
    const fullProfile: ClientRegistration = {
      ...profileData,
      uid: currentUser?.uid,
      email: currentUser?.email || clientProfile?.email || 'unregistered@client.com',
      authProvider: currentUser?.providerData[0]?.providerId || 'google.com',
      registeredAt: clientProfile?.registeredAt || formatDate(),
    };

    setClientProfile(fullProfile);
    localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(fullProfile));
    await saveClientRegistration(fullProfile);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('SignOut error:', err);
    }
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        clientProfile,
        isRegistered,
        isAdmin,
        loading,
        signInWithGoogle,
        registerWithEmail,
        loginWithEmail,
        saveProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
