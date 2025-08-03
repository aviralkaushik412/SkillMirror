import { useAuth } from '../../context/AuthContext';
import useData from '../../context/UseData';
import DifficultyDonutChart from './DifficultyDonutChart';

const UserStatsCard = () => {
  const { user } = useAuth();
  const { userData } = useData();

  const solvedProblems = userData?.solvedStats
    ? [
        {
          name: 'Easy',
          value: Math.round(
            (userData.solvedStats.easy.solved / userData.solvedStats.easy.total) * 100
          ),
          solved: userData.solvedStats.easy.solved,
          total: userData.solvedStats.easy.total,
          color: '#4ade80',
        },
        {
          name: 'Medium',
          value: Math.round(
            (userData.solvedStats.medium.solved / userData.solvedStats.medium.total) * 100
          ),
          solved: userData.solvedStats.medium.solved,
          total: userData.solvedStats.medium.total,
          color: '#fbbf24',
        },
        {
          name: 'Hard',
          value: Math.round(
            (userData.solvedStats.hard.solved / userData.solvedStats.hard.total) * 100
          ),
          solved: userData.solvedStats.hard.solved,
          total: userData.solvedStats.hard.total,
          color: '#f87171',
        },
      ]
    : [];

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-white text-center mb-4">
        Problems Solved
      </h2>

      <DifficultyDonutChart solvedData={solvedProblems} />

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-300">Total Solved</p>
          <p className="text-2xl font-bold text-white">
            {solvedProblems.reduce((sum, item) => sum + item.solved, 0)}
          </p>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-300">Accuracy</p>
          <p className="text-2xl font-bold text-indigo-400">
            {userData?.accuracy ?? 0}%
          </p>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-300">Streak</p>
          <p className="text-2xl font-bold text-amber-400">
            {userData?.streak ?? 0} days
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;
