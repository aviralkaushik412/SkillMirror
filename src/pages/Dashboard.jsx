import React, { useEffect, useState } from 'react';
import UserStatsCard from './Dashboard-Components/UserStatsCard';
import { useAuth } from '../context/AuthContext';
import { fetchDailyQuestion } from '../context/fetchDailyQuestion';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import  UserSubmissions from '../context/UserSubmissions';
import { 
  CalendarIcon, 
  VideoCameraIcon, 
  CubeIcon, 
  BookOpenIcon,
  FireIcon,
  AcademicCapIcon 
} from '@heroicons/react/24/outline';
const db = getFirestore();

const Dashboard = () => {
  // console.log(questionData);
  const { user } = useAuth();
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [questionUrl, setQuestionUrl] = useState('');
  
  

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
          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {/* Welcome Header */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
              <h1 className="text-2xl font-bold text-white mb-2">Today's DSA & Theory Set</h1>
              <p className="text-gray-400">Welcome back! Continue your learning journey.</p>
            </div>

            {/* Ongoing Series Card */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <VideoCameraIcon className="h-6 w-6 text-indigo-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">Ongoing Series</h2>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Striver Graph Series</p>
                    <p className="text-gray-400 text-sm mt-1">3-4 videos remaining</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Ongoing
                    </span>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Continue
                    </button>
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>

            {/* Daily Problems Card */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FireIcon className="h-6 w-6 text-amber-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">Daily Challenges</h2>
              </div>
              
              {/* POTD Section */}
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 mb-4">
                <div className="flex items-center mb-3">
                  <CubeIcon className="h-5 w-5 text-amber-300 mr-2" />
                  <h3 className="text-lg font-medium text-white">Problem of the Day</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="#" className="flex items-center bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg transition-colors">
                    <span className="text-orange-400 mr-2">⚡</span>
                    <span className="text-white">LeetCode</span>
                  </a>
                  <a href="#" className="flex items-center bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg transition-colors">
                    <span className="text-green-400 mr-2">🌱</span>
                    <span className="text-white">GeeksforGeeks</span>
                  </a>
                </div>
              </div>

              {/* Daily Problem Section */}
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center mb-3">
                  <CalendarIcon className="h-5 w-5 text-indigo-400 mr-2" />
                  <h3 className="text-lg font-medium text-white">Daily Problem</h3>
                </div>
                
                {questionTitle ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                      <div>
                        <p className="text-white font-medium">
                          {questionId}. {questionTitle}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Solve today's featured problem
                        </p>
                      </div>
                      <a
                        href={questionUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Solve Problem
                      </a>
                    </div>
                    <div className="mt-4">
                      <UserSubmissions />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="text-gray-400 mt-2">Loading daily question...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Theory Section */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <BookOpenIcon className="h-6 w-6 text-green-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">Theory Topics</h2>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-white">Graph Algorithms & Data Structures</p>
                  <div className="mt-3 flex items-center text-sm text-gray-400">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded mr-2">New</span>
                    <span>2 topics to complete</span>
                  </div>
                </div>
              </div>

              {/* Progress Tracking */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <AcademicCapIcon className="h-6 w-6 text-purple-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">Weekly Goals</h2>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-white">Complete 15 problems this week</p>
                  <div className="mt-3 w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">6/15 problems completed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card - Right Side */}
          <div className="lg:w-96">
            <UserStatsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
