import React, { useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserGroupIcon } from '@heroicons/react/24/outline';

const JoinContest = () => {
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleJoinContest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (inviteCode.length !== 6) {
      setError('Invite code must be 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Find contest by invite code
      const contestsRef = collection(db, 'contests');
      const q = query(contestsRef, where('inviteCode', '==', inviteCode.toUpperCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Contest not found. Check the invite code.');
        setLoading(false);
        return;
      }

      const contestDoc = querySnapshot.docs[0];
      const contestData = contestDoc.data();

      // Check if contest has already started
      if (contestData.status === 'started') {
        setError('Contest has already started. You cannot join now.');
        setLoading(false);
        return;
      }

      // Check if user is already a participant
      if (contestData.participants.includes(user.uid)) {
        navigate(`/compete/room/${inviteCode}`);
        return;
      }

      // Add user to participants
      await updateDoc(doc(db, 'contests', contestDoc.id), {
        participants: [...contestData.participants, user.uid]
      });

      navigate(`/compete/room/${inviteCode}`);
    } catch (error) {
      console.error('Error joining contest:', error);
      setError('Failed to join contest. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="text-center mb-6">
            <UserGroupIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white">Join Contest</h1>
            <p className="text-gray-400 mt-2">Enter the 6-character invite code</p>
          </div>

          <form onSubmit={handleJoinContest} className="space-y-6">
            <div>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="Enter invite code (e.g., A1B2C3)"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-center text-lg font-mono tracking-wider focus:ring-2 focus:ring-green-500 focus:border-green-500 uppercase"
                maxLength={6}
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || inviteCode.length !== 6}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
            >
              {loading ? 'Joining Contest...' : 'Join Contest'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have a code?{' '}
              <a 
                href="/compete/create" 
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Create your own contest
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinContest;