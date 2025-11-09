import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { generateInviteCode } from '../../utils/generateInviteCode';
import { useNavigate } from 'react-router-dom';
import { ClockIcon, ChartBarIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const CreateContest = () => {
  const [duration, setDuration] = useState(15);
  const [difficulty, setDifficulty] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(3);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateContest = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const inviteCode = generateInviteCode();
      
      const contestData = {
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        duration: duration,
        difficulty: difficulty,
        numQuestions: numQuestions,
        inviteCode: inviteCode,
        status: 'waiting',
        participants: [user.uid],
        startedAt: null,
        endedAt: null
      };

      await addDoc(collection(db, 'contests'), contestData);
      navigate(`/compete/room/${inviteCode}`);
    } catch (error) {
      console.error('Error creating contest:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Create Coding Contest
          </h1>

          <form onSubmit={handleCreateContest} className="space-y-6">
            {/* Duration Selection */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <ClockIcon className="h-5 w-5 text-indigo-400 mr-2" />
                Contest Duration
              </label>
              <div className="flex space-x-4">
                {[10, 15, 20].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setDuration(time)}
                    className={`flex-1 py-3 rounded-lg border-2 text-center font-medium transition-colors ${
                      duration === time
                        ? 'border-indigo-500 bg-indigo-500 text-white'
                        : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-indigo-400'
                    }`}
                  >
                    {time} mins
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <ChartBarIcon className="h-5 w-5 text-indigo-400 mr-2" />
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="easy" className="bg-gray-700">Easy</option>
                <option value="medium" className="bg-gray-700">Medium</option>
                <option value="hard" className="bg-gray-700">Hard</option>
              </select>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <QuestionMarkCircleIcon className="h-5 w-5 text-indigo-400 mr-2" />
                Number of Questions
              </label>
              <select
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={2} className="bg-gray-700">2 Questions</option>
                <option value={3} className="bg-gray-700">3 Questions</option>
                <option value={4} className="bg-gray-700">4 Questions</option>
              </select>
            </div>

            {/* Create Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
            >
              {loading ? 'Creating Contest...' : 'Create Contest'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-sm font-medium text-gray-300 mb-2">How it works:</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Create contest with your preferred settings</li>
              <li>• Share invite code with friends</li>
              <li>• Solve problems in real-time</li>
              <li>• Compete on the leaderboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContest;