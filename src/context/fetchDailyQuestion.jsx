import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // "YYYY-MM-DD"
};

export const fetchDailyQuestion = async (uid) => {
  const today = getTodayDate();
  const questionDocRef = doc(db, 'users', uid, 'dailyQuestions', today);

  const questionSnap = await getDoc(questionDocRef);
  if (questionSnap.exists()) {
    return questionSnap.data();
  }

  const res = await fetch('https://api.allorigins.win/raw?url=https://leetcode-api-pied.vercel.app/random');
  const data = await res.json();

  const questionData = {
    id: data.id,
    frontend_id: data.frontend_id,
    title: data.title,
    title_slug: data.title_slug,
    url: data.url,
  };

  await setDoc(questionDocRef, questionData);
  return questionData;
};
