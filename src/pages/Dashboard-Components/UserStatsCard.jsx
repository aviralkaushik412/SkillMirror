import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import DifficultyDonutChart from './DifficultyDonutChart';

const UserStatsCard = () => {
  const solvedProblems = [
    { 
      name: 'Easy', 
      value: 45, 
      solved: 120, 
      total: 150, 
      color: '#4ade80' 
    },
    { 
      name: 'Medium', 
      value: 30, 
      solved: 60, 
      total: 100, 
      color: '#fbbf24' 
    },
    { 
      name: 'Hard', 
      value: 15, 
      solved: 15, 
      total: 50, 
      color: '#f87171'
    },
  ];

  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-white text-center mb-4">
        Problems Solved
      </h2>
      <DifficultyDonutChart solvedData={solvedProblems} />
      
      {/* Additional Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-300">Total Solved</p>
          <p className="text-2xl font-bold text-white">
            {solvedProblems.reduce((sum, item) => sum + item.solved, 0)}
          </p>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-300">Accuracy</p>
          <p className="text-2xl font-bold text-indigo-400">87%</p>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-300">Streak</p>
          <p className="text-2xl font-bold text-amber-400">15 days</p>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;