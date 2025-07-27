import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'; // We'll assume you're creating a separate Footer.jsx
import image from '../assets/image.png'
import Carousel  from './Better-Components/Carousel';
import FAQSection from './Better-Components/FAQSection';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

const FeatureCard = ({ title, description, popup }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className="bg-gray-200 hover:cursor-pointer p-6 rounded-lg shadow hover:shadow-lg transition duration-300 relative"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
      {showPopup && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 p-4 text-xs rounded shadow-lg w-56 z-10">
          {popup}
        </div>
      )}
    </div>
  );
};
const Home = () => {
  
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-gray-400 text-white py-30 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">SkillMirror</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Daily personalized DSA + Theory + MCQ + Puzzle questions directly to your dashboard.
        </p>
        <div className="space-x-4">
          <Link
            to="/get-started"
            className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded hover:bg-gray-200 hover:cursor-pointer"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-white px-6 py-2 rounded hover:bg-white hover:text-indigo-700"
          >
            Login
          </Link>
        </div>
      </section>
    
     {/* Features Section */}
<section id="why-skillmirror" className="py-20 px-6 bg-white">
  <h2 className="text-4xl font-bold text-center mb-16">Why SkillMirror?</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
    <div className="bg-gray-200 hover:cursor-pointer p-6 rounded-xl shadow-md hover:shadow-cyan-950 transition duration-300">
      <h3 className="text-xl font-bold mb-3">Daily DSA Practice</h3>
      <p className="text-sm text-gray-900">
        Solve carefully selected DSA problems every day, categorized by topic and difficulty. Includes editorials and your submission history to track how you’re improving.
      </p>
    </div>
    <div className="bg-gray-200 hover:cursor-pointer p-6 rounded-xl shadow-md hover:shadow-cyan-950 transition duration-300">
      <h3 className="text-xl font-bold mb-3">Core CS Theory</h3>
      <p className="text-sm text-gray-900">
        Daily theory bites from OS, DBMS, OOP, and CN with explanations, diagrams, and spaced revision — so you remember concepts for the long run.
      </p>
    </div>
    <div className="bg-gray-200 hover:cursor-pointer p-6 rounded-xl shadow-md hover:shadow-cyan-950 transition duration-300">
      <h3 className="text-xl font-bold mb-3">MCQ Bank</h3>
      <p className="text-sm text-gray-900">
        Daily MCQs from aptitude and CS fundamentals, built to help you revise faster and crack test rounds with confidence.
      </p>
    </div>
    <div className="bg-gray-200 hover:cursor-pointer p-6 rounded-xl shadow-md hover:shadow-cyan-950 transition duration-300">
      <h3 className="text-xl font-bold mb-3">Puzzles & Logic</h3>
      <p className="text-sm text-gray-900">
        Fun but challenging puzzles help boost your reasoning, lateral thinking, and interview IQ — all with explanations and leaderboard.
      </p>
    </div>
  </div>
</section>

{/* How it Works */}

<section id='working' className="bg-gray-50 py-20 px-6">
  <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
    <div className="text-center bg-gray-200 p-6 rounded-xl shadow-md hover:shadow-cyan-950 transition duration-300">
      <div className="text-5xl mb-4">📝</div>
      <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
      <p className="text-sm text-gray-900">
        Sign in with Google and select your goals. Whether you're beginner or advanced, we'll adapt the prep plan for you.
      </p>
    </div>
    <div className="text-center bg-gray-200 p-6 rounded-xl shadow-md hover:shadow-cyan-950 transition duration-300">
      <div className="text-5xl mb-4">📬</div>
      <h3 className="text-xl font-semibold mb-2">Daily Questions</h3>
      <p className="text-sm text-gray-900">
        Get 1 DSA, 1 theory, 1 MCQ, and 1 puzzle every day — curated and personalized. Never feel lost in the ocean of resources again.
      </p>
    </div>
    <div className="text-center bg-gray-200 p-6 rounded-xl shadow-md hover:shadow-cyan-950 transition duration-300">
      <div className="text-5xl mb-4">📈</div>
      <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
      <p className="text-sm text-gray-900">
        Visual dashboard shows your accuracy, weak areas, streaks, and daily improvements — so you stay accountable and consistent.
      </p>
    </div>
    <div className="text-center bg-gray-200 p-6 rounded-xl shadow-md hover:shadow-cyan-950 transition duration-300">
      <div className="text-5xl mb-4">🔗</div>
      <h3 className="text-xl font-semibold mb-2">Auto-Sync Coding Profiles</h3>
      <p className="text-sm text-gray-900">
        Add your LeetCode, GeeksforGeeks, Codeforces, etc., and SkillMirror automatically fetches and syncs your real-time stats. No manual updates — just effortless tracking and insights.
      </p>
    </div>
  </div>
</section>
{/* Sneak Peek and Images */}
      <section className="py-16 px-6 bg-grey-50">
        <h2 className="text-3xl font-bold text-center mb-10">Sneak Peek</h2>
        <div className="flex justify-center">
          <img
            src={image}
            alt="Dashboard preview"
            className="rounded-lg shadow-lg w-full max-w-4xl"
          />
        </div>
      </section>
      {/* FAQs Section */}
        <FAQSection></FAQSection>

      {/* Footer Component */}
       <div className="flex justify-center w-full mt-8 my-5">
      <a 
        href="#top" 
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
      >
        Scroll to top
        <ArrowUpIcon className="h-4 w-4" />
      </a>
    </div>
      <Footer />
    </div>
  );
};

export default Home;
