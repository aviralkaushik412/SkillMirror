// src/pages/Compete/Compete.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { TrophyIcon, UserGroupIcon, PlusIcon } from '@heroicons/react/24/outline';

const Compete = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <TrophyIcon className="h-16 w-16 text-amber-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Code Compete</h1>
        <p className="text-gray-400 text-lg mb-12">
          Challenge your friends and improve your coding skills in real-time contests
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Create Contest Card */}
          <Link
            to="/compete/create"
            className="bg-gray-800 hover:bg-gray-700 rounded-xl p-8 border-2 border-indigo-500 hover:border-indigo-400 transition-all duration-300 group"
          >
            <PlusIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Create Contest</h3>
            <p className="text-gray-400">
              Start a new coding contest and invite friends to join
            </p>
          </Link>

          {/* Join Contest Card */}
          <Link
            to="/compete/join"
            className="bg-gray-800 hover:bg-gray-700 rounded-xl p-8 border-2 border-green-500 hover:border-green-400 transition-all duration-300 group"
          >
            <UserGroupIcon className="h-12 w-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Join Contest</h3>
            <p className="text-gray-400">
              Enter an invite code to join an existing contest
            </p>
          </Link>
        </div>

        {/* How it works section */}
        <div className="mt-16 bg-gray-800 rounded-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="text-center">
              <div className="bg-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">1</div>
              <h3 className="text-white font-semibold mb-2">Create or Join</h3>
              <p className="text-gray-400 text-sm">Start a new contest or join with an invite code</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">2</div>
              <h3 className="text-white font-semibold mb-2">Solve Problems</h3>
              <p className="text-gray-400 text-sm">Code against the clock in real-time</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">3</div>
              <h3 className="text-white font-semibold mb-2">See Results</h3>
              <p className="text-gray-400 text-sm">Compare your performance on the leaderboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compete;