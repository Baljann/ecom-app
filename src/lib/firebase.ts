import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log("Firebase config:", {
  apiKey: firebaseConfig.apiKey ? "Set" : "Missing",
  authDomain: firebaseConfig.authDomain ? "Set" : "Missing", 
  projectId: firebaseConfig.projectId ? "Set" : "Missing",
  storageBucket: firebaseConfig.storageBucket ? "Set" : "Missing",
  messagingSenderId: firebaseConfig.messagingSenderId ? "Set" : "Missing",
  appId: firebaseConfig.appId ? "Set" : "Missing",
});

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const collections = {
  products: "products",
};
