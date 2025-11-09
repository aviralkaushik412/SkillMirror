import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc, collection, addDoc, serverTimestamp, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
// import { useParams } from 'react-router-dom';
import mockQuestions from '../../data/mockQuestions.json';
import Leaderboard from './components/Leaderboard';
import { useParams, useNavigate } from 'react-router-dom';
import { ClockIcon, PlayIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ContestRoom = () => {
  const [contest, setContest] = useState(null);
  const [contestId, setContestId] = useState(null); // Store the document ID separately
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [submissions, setSubmissions] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { inviteCode } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!inviteCode) return;

    // Listen to contest updates
    const contestsRef = collection(db, 'contests');
    const q = query(contestsRef, where('inviteCode', '==', inviteCode));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const contestDoc = snapshot.docs[0];
        const contestData = contestDoc.data();
        setContest(contestData);
        setContestId(contestDoc.id); // Store the document ID
        
        if (contestData.status === 'started' && contestData.startedAt) {
          const endTime = contestData.startedAt.toDate().getTime() + contestData.duration * 60 * 1000;
          const now = Date.now();
          setTimeLeft(Math.max(0, endTime - now));
        }
      }
    });

    return () => unsubscribe();
  }, [inviteCode]);

  useEffect(() => {
    if (timeLeft <= 0 || contest?.status !== 'started') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1000) {
          handleContestEnd();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, contest?.status]);

  const startContest = async () => {
    if (!contestId || contest.createdBy !== user.uid) return;

    try {
      const contestDoc = doc(db, 'contests', contestId);
      await updateDoc(contestDoc, {
        status: 'started',
        startedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error starting contest:', error);
    }
  };

  const handleContestEnd = async () => {
    if (!contestId) return;

    try {
      const contestDoc = doc(db, 'contests', contestId);
      await updateDoc(contestDoc, {
        status: 'ended',
        endedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error ending contest:', error);
    }
  };

  const submitSolution = async () => {
    if (!userCode.trim() || !contestId) return;

    setLoading(true);
    try {
      const submissionData = {
        userId: user.uid,
        questionId: mockQuestions.questions[currentQuestion].id,
        code: userCode,
        submittedAt: serverTimestamp(),
        contestId: contestId,
        inviteCode: inviteCode
      };

      await addDoc(collection(db, 'submissions'), submissionData);
      
      setSubmissions(prev => ({
        ...prev,
        [mockQuestions.questions[currentQuestion].id]: true
      }));

      setUserCode('');
    } catch (error) {
      console.error('Error submitting solution:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // If contest ended, show results
  useEffect(() => {
    if (contest?.status === 'ended') {
      navigate(`/compete/results/${contestId}`, { 
        state: { inviteCode, contestId } 
      });
    }
  }, [contest?.status, contestId, inviteCode, navigate]);

  if (!contest) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading contest...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Contest Header */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Contest: {inviteCode}</h1>
              <p className="text-gray-400">
                {contest.difficulty} • {contest.numQuestions} questions • {contest.duration} minutes
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {contest.status === 'waiting' && contest.createdBy === user.uid && (
                <button
                  onClick={startContest}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center"
                >
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Start Contest
                </button>
              )}
              
              {contest.status === 'started' && (
                <div className="flex items-center bg-red-600 px-4 py-2 rounded-lg">
                  <ClockIcon className="h-5 w-5 text-white mr-2" />
                  <span className="text-white font-mono text-lg">{formatTime(timeLeft)}</span>
                </div>
              )}

              {contest.status === 'ended' && (
                <div className="flex items-center bg-gray-600 px-4 py-2 rounded-lg">
                  <span className="text-white">Contest Ended</span>
                </div>
              )}
            </div>
          </div>

          {contest.status === 'waiting' && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500 rounded-lg">
              <p className="text-blue-400 text-center">
                Waiting for contest to start... {contest.participants?.length || 1} participants joined
              </p>
              {contest.createdBy === user.uid && (
                <p className="text-blue-300 text-center text-sm mt-2">
                  You are the contest creator. Click "Start Contest" when ready.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Questions Panel */}
          <div className="lg:col-span-2 space-y-6">
            {contest.status === 'started' && (
              <>
                {/* Question Navigation */}
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex space-x-2">
                    {mockQuestions.questions.slice(0, contest.numQuestions).map((question, index) => (
                      <button
                        key={question.id}
                        onClick={() => setCurrentQuestion(index)}
                        className={`flex items-center px-4 py-2 rounded-lg ${
                          currentQuestion === index
                            ? 'bg-indigo-600 text-white'
                            : submissions[question.id]
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {submissions[question.id] && (
                          <CheckCircleIcon className="h-4 w-4 mr-2" />
                        )}
                        Q{index + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Question */}
                <div className="bg-gray-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">
                    {mockQuestions.questions[currentQuestion].title}
                  </h2>
                  <p className="text-gray-300 mb-6">
                    {mockQuestions.questions[currentQuestion].description}
                  </p>
                  
                  <div className="bg-gray-700 rounded-lg p-4 mb-6">
                    <pre className="text-green-400 text-sm">
                      {mockQuestions.questions[currentQuestion].codeSnippet}
                    </pre>
                  </div>

                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder="Write your solution here..."
                    className="w-full h-48 bg-gray-700 border border-gray-600 rounded-lg p-4 text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    onClick={submitSolution}
                    disabled={loading || !userCode.trim()}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Submitting...' : 'Submit Solution'}
                  </button>
                </div>
              </>
            )}

            {contest.status === 'waiting' && (
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Contest Not Started</h3>
                <p className="text-gray-400">
                  The contest creator will start the competition soon. Get ready!
                </p>
              </div>
            )}
          </div>

          {/* Leaderboard Panel */}
          <div className="lg:col-span-1">
            <Leaderboard contestId={contestId} inviteCode={inviteCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestRoom;