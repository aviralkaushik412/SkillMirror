import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { TrophyIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Leaderboard = ({ contestId }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contestId) return;

    // Listen to submissions for this contest
    const submissionsRef = collection(db, 'submissions');
    const q = query(submissionsRef, where('contestId', '==', contestId));
    
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const submissions = snapshot.docs.map(doc => doc.data());
      
      // Calculate scores per user
      const userScores = {};
      submissions.forEach(sub => {
        if (!userScores[sub.userId]) {
          userScores[sub.userId] = { userId: sub.userId, score: 0, submissions: 0 };
        }
        userScores[sub.userId].score += 1; // 1 point per submission
        userScores[sub.userId].submissions += 1;
      });

      // Convert to array and sort by score
      const sortedLeaderboard = Object.values(userScores)
        .sort((a, b) => b.score - a.score)
        .map((user, index) => ({ ...user, rank: index + 1 }));

      setLeaderboard(sortedLeaderboard);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [contestId]);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center mb-6">
        <TrophyIcon className="h-6 w-6 text-amber-400 mr-2" />
        <h2 className="text-xl font-bold text-white">Leaderboard</h2>
      </div>

      <div className="space-y-3">
        {leaderboard.map((participant) => (
          <div
            key={participant.userId}
            className={`flex items-center justify-between p-3 rounded-lg ${
              participant.rank === 1
                ? 'bg-amber-500/20 border border-amber-500'
                : 'bg-gray-700'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                participant.rank === 1 ? 'bg-amber-500 text-white' : 'bg-gray-600 text-gray-300'
              }`}>
                {participant.rank}
              </div>
              <div className="ml-3">
                <div className="flex items-center text-white text-sm font-medium">
                  <UserCircleIcon className="h-4 w-4 mr-1 text-gray-400" />
                  User {participant.userId.slice(-4)}
                </div>
                <div className="text-xs text-gray-400">
                  {participant.submissions} submissions
                </div>
              </div>
            </div>
            <div className="text-white font-bold">{participant.score} pts</div>
          </div>
        ))}

        {leaderboard.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No submissions yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;