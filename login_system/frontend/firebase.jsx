import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUeAjyMGjGMXldYbxgwtwMJMGsMaMCIfs",
  authDomain: "ir-punjabi-jutti.firebaseapp.com",
  projectId: "ir-punjabi-jutti",
  storageBucket: "ir-punjabi-jutti.firebasestorage.app",
  messagingSenderId: "786323688074",
  appId: "1:786323688074:web:46b19e27afce757d0c3b73"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };