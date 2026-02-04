import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: ReturnType<typeof initializeApp> | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;
let storage: FirebaseStorage | null = null;

const isValidFirebaseConfig = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId
  );
};

const initializeFirebase = () => {
  // Evitar inicializar sem config válida (durante build)
  if (!isValidFirebaseConfig()) {
    return { app: null, auth: null, firestore: null, storage: null };
  }

  if (app) {
    return { app, auth, firestore, storage };
  }

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  firestore = getFirestore(app);
  storage = getStorage(app);

  return { app, auth, firestore, storage };
};

export const getFirebaseApp = () => {
  if (!app) {
    const { app: initializedApp } = initializeFirebase();
    if (!initializedApp) throw new Error('Firebase not initialized - missing env variables');
    return initializedApp;
  }
  return app;
};

export const getFirebaseAuth = (): Auth => {
  if (!auth) {
    const { auth: initializedAuth } = initializeFirebase();
    if (!initializedAuth) throw new Error('Firebase Auth not initialized');
    return initializedAuth;
  }
  return auth;
};

export const getFirebaseFirestore = (): Firestore => {
  if (!firestore) {
    const { firestore: initializedFirestore } = initializeFirebase();
    if (!initializedFirestore) throw new Error('Firestore not initialized');
    return initializedFirestore;
  }
  return firestore;
};

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!storage) {
    const { storage: initializedStorage } = initializeFirebase();
    if (!initializedStorage) throw new Error('Storage not initialized');
    return initializedStorage;
  }
  return storage;
};

export default initializeFirebase;
