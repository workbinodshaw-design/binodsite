import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import * as dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    console.log("Writing to analytics...");
    await addDoc(collection(db, "analytics"), {
      path: "/test-script",
      hostname: "localhost",
      timestamp: serverTimestamp()
    });
    console.log("Success! Write worked.");
    
    console.log("Reading from analytics...");
    const snapshot = await getDocs(collection(db, "analytics"));
    console.log(`Found ${snapshot.size} documents.`);
    snapshot.forEach(doc => {
      console.log(doc.data().path);
    });
    process.exit(0);
  } catch (e) {
    console.error("Firebase Error:", e.message);
    process.exit(1);
  }
}

test();
