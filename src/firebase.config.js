import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeBM5QfYG4GRH2bTWSrYp3NOMc-ZIVB28",
  authDomain: "shemach-612da.firebaseapp.com",
  projectId: "shemach-612da",
  storageBucket: "shemach-612da.appspot.com",
  messagingSenderId: "794712268706",
  appId: "1:794712268706:web:3f2ae66cdd782ce4e39cfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);

export default app