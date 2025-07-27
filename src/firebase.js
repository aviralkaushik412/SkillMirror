import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyBfH5a32tg5bJ2WrO-By-xBaS3ttUpRT4o",
//   authDomain: "skillmirror-237a3.firebaseapp.com",
//   projectId: "skillmirror-237a3",
//   storageBucket: "skillmirror-237a3.firebasestorage.app",
//   messagingSenderId: "787332916090",
//   appId: "1:787332916090:web:4d42b0da472151fe3decc3",
//   measurementId: "G-F5CX3ZXBQ3"
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };