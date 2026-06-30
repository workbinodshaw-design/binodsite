import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
let app;
let db;
let auth;
let storage;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
} catch (error) {
  console.error("Firebase initialization error. Did you forget to add your .env variables?", error);
}

/**
 * Utility to save a lead to the Firestore database
 * @param {Object} leadData - The data from the form
 * @param {string} source - Where the lead came from (e.g. 'contact_form', 'service_modal')
 */
export const saveLeadToDatabase = async (leadData, source = 'website') => {
  if (!db) {
    console.warn("Database not connected. Lead was not saved.");
    return false;
  }
  
  try {
    const docRef = await addDoc(collection(db, "leads"), {
      ...leadData,
      source: source,
      createdAt: serverTimestamp(),
      status: 'new' // Useful for a CRM pipeline later
    });
    console.log("Lead successfully saved with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

/**
 * Utility to save a job application to the Firestore database
 * @param {Object} applicationData - The data from the form
 */
export const saveJobApplicationToDatabase = async (applicationData) => {
  if (!db) {
    console.warn("Database not connected. Application was not saved.");
    return false;
  }
  
  try {
    const docRef = await addDoc(collection(db, "team_applications"), {
      ...applicationData,
      createdAt: serverTimestamp(),
      status: 'New'
    });
    console.log("Application successfully saved with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

export { db, auth, storage };
