import { getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
  connectAuthEmulator(getAuth(), "http://localhost:9099", {
    disableWarnings: true,
  });
  connectFirestoreEmulator(getFirestore(), "localhost", 8080);
  connectStorageEmulator(getStorage(), "localhost", 9199);
}

export const auth = getAuth();
export const firestore = getFirestore();
export const storage = getStorage();
