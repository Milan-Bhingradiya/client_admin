// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: 'smitshah-portfolio.firebaseapp.com',
  projectId: 'smitshah-portfolio',
  storageBucket: 'smitshah-portfolio.appspot.com',
  messagingSenderId: '598574473734',
  appId: '1:598574473734:web:e452e749eac8f84d195987',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const firestoreInstance = getFirestore(app);
