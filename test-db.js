import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    await addDoc(collection(db, "analytics"), {
      path: "/test-path",
      hostname: "localhost",
      timestamp: serverTimestamp()
    });
    console.log("Successfully wrote to analytics collection!");
    
    const snapshot = await getDocs(collection(db, "analytics"));
    console.log(`Found ${snapshot.size} documents in analytics collection.`);
    snapshot.forEach(doc => {
      console.log(doc.data());
    });
  } catch (e) {
    console.error("Firebase Error:", e.message);
  }
}

test();
