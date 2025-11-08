import React, { useEffect, useState } from 'react';
import UserStatsCard from './Dashboard-Components/UserStatsCard';
import { useAuth } from '../context/AuthContext';
import { fetchDailyQuestion } from '../context/fetchDailyQuestion';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import  UseData from '../context/UseData';
const db = getFirestore();

const Dashboard = () => {
  // console.log(questionData);
  const { user } = useAuth();
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [questionUrl, setQuestionUrl] = useState('');
  const { userData, loadingUserData } = UseData();
  const accId = userData?.LCid; // 👈 instant access
  console.log("LCid:", accId);

  useEffect(() => {
  const loadDailyQuestion = async () => {
    if (!user) return;

    try {
      const data = await fetchDailyQuestion(user.uid);
      setQuestionTitle(data.title);
      setQuestionId(data.id);
      setQuestionUrl(data.url);
    } catch (err) {
      console.error('Failed to fetch daily question:', err.message);
    }
  };

  loadDailyQuestion();
}, [user]);

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-gray-800 rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-white mb-6">Today’s DSA & Theory Set</h1>

            <div className="bg-gray-700 rounded-lg p-4 text-gray-300 my-5">
              <p>Recents - Striver Graph Series ongoing - 3-4 VIDEOS</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 text-gray-300 my-5">
              <p>DSA : POTD [ LeetCode ] [ GeeksforGeeks ]</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 text-gray-300 my-5">
              {questionTitle ? (
                <p>
                  DSA SELF: {questionId} - {questionTitle} (
                  <a
                    href={questionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-amber-300"
                  >
                    Open
                  </a>
                  )
                </p>
              ) : (
                <p>Loading daily question...</p>
              )}
            </div>

            <div className="bg-gray-700 rounded-lg p-4 text-gray-300 my-5">
              <p>Main content area</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-gray-300 my-5">
              <p>Main content area</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-gray-300 my-5">
              <p>Main content area</p>
            </div>
          </div>

          <div className="lg:w-96">
            <UserStatsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
