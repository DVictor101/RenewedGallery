import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
 apiKey:
  "AIzaSyArrsVPJroqW3L6raAqdO8l6KzBSYHxygU",
 authDomain: "renewedgallery.firebaseapp.com",
 projectId: "renewedgallery",
 storageBucket: "renewedgallery.appspot.com",
 messagingSenderId: "881424476927",
 appId:
  "1:881424476927:web:6cbd320e0d996c94a23aca",
 measurementId: "G-8G4JGVEZPD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
