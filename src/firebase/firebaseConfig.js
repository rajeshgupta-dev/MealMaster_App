import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAuPVe6Rfv_MHtHdBeCH_KC_hw-NvCPabI",
//   authDomain: "fiberbasedatabase.firebaseapp.com",
//   projectId: "fiberbasedatabase",
//   storageBucket: "fiberbasedatabase.firebasestorage.app",
//   messagingSenderId: "485261121411",
//   appId: "1:485261121411:web:2ea124a54f919f409b48b6"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAN4xmzmhjqOA9UhHp2iDzTqj4AmWfBrw0",
  authDomain: "mealmaster-cc8f7.firebaseapp.com",
  projectId: "mealmaster-cc8f7",
  storageBucket: "mealmaster-cc8f7.firebasestorage.app",
  messagingSenderId: "876528495000",
  appId: "1:876528495000:web:685634da35aee85fb9a3ed"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const firebase.firestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
