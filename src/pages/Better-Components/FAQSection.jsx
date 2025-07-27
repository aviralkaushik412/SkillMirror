import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
  {
    question: "What exactly does SkillMirror provide?",
    answer: "SkillMirror delivers 1 DSA question, 1 theory concept, 1 MCQ, and 1 puzzle daily — all tailored to your progress. It’s your personal interview prep assistant."
  },
  {
    question: "How does SkillMirror track my coding activity?",
    answer: "You can link platforms like LeetCode, GFG, or Codeforces. We automatically fetch your stats, keeping your daily streak and performance accurate and effortless."
  },
  {
    question: "Is SkillMirror free to use?",
    answer: "Yes! SkillMirror’s core features are completely free. We may offer premium insights or analytics in the future, but practicing daily will always be free."
  },
  {
    question: "What if I miss a day or break my streak?",
    answer: "Don’t worry! You’ll get a gentle nudge, and your performance graph will reflect it — but the goal is consistency, not perfection."
  },
  {
    question: "How is my data secured?",
    answer: "We only fetch your public activity data and store it securely. All data is encrypted, and we never share or sell your information."
  }
];


  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Can't find what you're looking for? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Contact our support team</a>.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-center justify-between p-6 text-left ${activeIndex === index ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-100 transition-colors duration-200 rounded-lg border border-gray-200`}
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              <div
                className={`px-6 pt-0 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96 pb-6' : 'max-h-0'}`}
              >
                <div className="bg-gray-50 p-4 rounded-b-lg">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id='contact-us' className="mt-12 text-center bg-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to help you 24/7.
          </p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;