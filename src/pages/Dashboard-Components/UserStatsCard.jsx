// src/pages/Dashboard/UserStatsCard.jsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import {db} from '../../firebase';
import {useAuth} from '../../context/AuthContext';

const UserStatsCard = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState({
    totalWins: 0,
    totalLosses: 0,
    streak: 0,
    displayName: 'You'
  });
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch current user's stats
        if (user) {
          try {
            const userDocRef = doc(db, 'userdata', user.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
              const data = userDoc.data();
              setUserStats({
                totalWins: data.totalWins || 0,
                totalLosses: data.totalLosses || 0,
                streak: data.streak || 0,
                displayName: data.displayName || 'You'
              });
            } else {
              // User document doesn't exist - use defaults
              console.log('No user data found, using default values');
              setUserStats({
                totalWins: 0,
                totalLosses: 0,
                streak: 0,
                displayName: 'You'
              });
            }
          } catch (userError) {
            console.error('Error fetching user stats:', userError);
            // Continue with default values even if user fetch fails
            setUserStats({
              totalWins: 0,
              totalLosses: 0,
              streak: 0,
              displayName: 'You'
            });
          }
        }

        // Fetch top 5 players
        try {
          const leaderboardQuery = query(
            collection(db, 'userdata'),
            orderBy('totalWins', 'desc'),
            limit(5)
          );
          
          const querySnapshot = await getDocs(leaderboardQuery);
          const players = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            players.push({ 
              id: doc.id, 
              totalWins: data.totalWins || 0,
              totalLosses: data.totalLosses || 0,
              displayName: data.displayName || 'Anonymous',
              streak: data.streak || 0
            });
          });
          
          setTopPlayers(players);
        } catch (leaderboardError) {
          console.error('Error fetching leaderboard:', leaderboardError);
          // Even if leaderboard fails, we can still show user stats
          setTopPlayers([]);
          setError('Failed to load leaderboard');
        }

      } catch (err) {
        console.error('Unexpected error in fetchContestData:', err);
        setError('Failed to load contest data');
      } finally {
        setLoading(false);
      }
    };

    fetchContestData();
  }, [user]);

  // Calculate user rank and win rate
  const userRank = user ? topPlayers.findIndex(player => player.id === user.uid) + 1 : 0;
  const wins = userStats.totalWins;
  const losses = userStats.totalLosses;
  const totalGames = wins + losses;
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Contest Performance Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">⚔️ Contest Performance</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-700 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">{wins}</div>
            <div className="text-sm text-gray-300">Wins</div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-400">{losses}</div>
            <div className="text-sm text-gray-300">Losses</div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">{winRate}%</div>
            <div className="text-sm text-gray-300">Win Rate</div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center text-orange-400">
            <span>🔥</span>
            <span className="ml-1">Streak: {userStats.streak} days</span>
          </div>
          
          <div className="flex items-center text-yellow-400">
            <span>🥇</span>
            <span className="ml-1">
              Rank: {userRank > 0 ? `#${userRank}` : 'Unranked'}
            </span>
          </div>
        </div>
      </div>

      {/* Top 5 Leaderboard Section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">🏆 Top 5 Players</h2>
        
        {error ? (
          <div className="text-red-400 text-center py-4">
            {error}
          </div>
        ) : topPlayers.length === 0 ? (
          <div className="text-gray-400 text-center py-4">
            No leaderboard data available
          </div>
        ) : (
          <div className="space-y-3">
            {topPlayers.map((player, index) => {
              const isCurrentUser = user && player.id === user.uid;
              const displayName = isCurrentUser 
                ? (player.displayName || 'You')
                : (player.displayName || 'Anonymous');
              
              return (
                <div 
                  key={player.id}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    isCurrentUser ? 'bg-blue-900 bg-opacity-50' : 'bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-gray-300 w-6">#{index + 1}</span>
                    <span className={`${isCurrentUser ? 'text-blue-300 font-medium' : 'text-white'}`}>
                      {displayName}
                    </span>
                    {isCurrentUser && <span className="ml-2 text-xs text-blue-300">(You)</span>}
                  </div>
                  <div className="text-green-400 font-semibold">
                    {player.totalWins} wins
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStatsCard;