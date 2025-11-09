import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TrophyIcon, ChartBarIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const ResultScreen = ({ contestId, inviteCode }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    calculateResults();
  }, [contestId]);

  const calculateResults = async () => {
    try {
      // Get contest data
      const contestDoc = await getDoc(doc(db, 'contests', contestId));
      const contestData = contestDoc.data();

      // Get all submissions for this contest
      const submissionsRef = collection(db, 'submissions');
      const q = query(submissionsRef, where('contestId', '==', contestId));
      const submissionsSnapshot = await getDocs(q);
      const submissions = submissionsSnapshot.docs.map(doc => doc.data());

      // Calculate user results
      const userResults = {};
      submissions.forEach(sub => {
        if (!userResults[sub.userId]) {
          userResults[sub.userId] = {
            userId: sub.userId,
            totalSubmissions: 0,
            correctSubmissions: 0,
            totalTime: 0
          };
        }
        userResults[sub.userId].totalSubmissions += 1;
        // For now, count all submissions as correct (implement actual checking later)
        userResults[sub.userId].correctSubmissions += 1;
      });

      // Convert to array and calculate ranks
      const resultsArray = Object.values(userResults).map(userResult => ({
        ...userResult,
        accuracy: (userResult.correctSubmissions / userResult.totalSubmissions) * 100,
        rank: 1 // Simplified ranking
      })).sort((a, b) => b.correctSubmissions - a.correctSubmissions);

      setResults({
        contest: contestData,
        userResults: resultsArray,
        currentUserResult: resultsArray.find(r => r.userId === user.uid)
      });

      // Update user stats
      await updateUserStats(resultsArray.find(r => r.userId === user.uid));

    } catch (error) {
      console.error('Error calculating results:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStats = async (userResult) => {
    if (!userResult) return;

    try {
      const userStatsRef = doc(db, 'userdata', user.uid);
      const userStatsDoc = await getDoc(userStatsRef);

      const newStats = {
        totalContests: (userStatsDoc.data()?.totalContests || 0) + 1,
        totalWins: userStatsDoc.data()?.totalWins || (userResult.rank === 1 ? 1 : 0),
        accuracy: userResult.accuracy,
        lastContest: new Date()
      };

      await updateDoc(userStatsRef, newStats);
    } catch (error) {
      console.error('Error updating user stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Calculating results...</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">No results found</div>
      </div>
    );
  }

  const { currentUserResult, userResults } = results;

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <TrophyIcon className="h-16 w-16 text-amber-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white">Contest Results</h1>
          <p className="text-gray-400 mt-2">Contest {inviteCode} has ended</p>
        </div>

        {/* User's Performance Card */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6 border-l-4 border-amber-500">
          <h2 className="text-xl font-bold text-white mb-4">Your Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <TrophyIcon className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{currentUserResult?.rank || 'N/A'}</div>
              <div className="text-sm text-gray-400">Rank</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <ChartBarIcon className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {currentUserResult?.accuracy?.toFixed(1) || 0}%
              </div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <ClockIcon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {currentUserResult?.correctSubmissions || 0}
              </div>
              <div className="text-sm text-gray-400">Solved</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <UserGroupIcon className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {userResults.length}
              </div>
              <div className="text-sm text-gray-400">Participants</div>
            </div>
          </div>
        </div>

        {/* Final Leaderboard */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Final Standings</h2>
          <div className="space-y-3">
            {userResults.map((result, index) => (
              <div
                key={result.userId}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  result.userId === user.uid
                    ? 'bg-indigo-500/20 border border-indigo-500'
                    : 'bg-gray-700'
                } ${index === 0 ? 'border-2 border-amber-500' : ''}`}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index === 0
                      ? 'bg-amber-500 text-white'
                      : result.userId === user.uid
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <div className="text-white font-medium">
                      {result.userId === user.uid ? 'You' : `User ${result.userId.slice(-4)}`}
                    </div>
                    <div className="text-sm text-gray-400">
                      {result.correctSubmissions} problems solved
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{result.accuracy.toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">accuracy</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/compete/create')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Create New Contest
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;