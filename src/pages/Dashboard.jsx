import React from 'react';
import UserStatsCard from './Dashboard-Components/UserStatsCard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-gray-800 rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-white mb-6">Today’s DSA & Theory Set</h1>
            <div className="bg-gray-700 rounded-lg p-4 text-gray-300">
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