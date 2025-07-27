import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'
import googleIcon from '../../assets/google.webp'
const GoogleAuth = () => {
  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      const result = await signInWithPopup(auth, provider);

      // Optional: You can log or use user info here
      const user = result.user;
      console.log('Signed in as:', user.displayName, user.email);
    } catch (err) {
      console.error('Google Sign-In Error:', err.message);
    }
  };

  return (
    <div className="w-full">
  <button
    onClick={loginHandler}
    className="w-full bg-white border border-gray-300 rounded-lg shadow-sm flex items-center justify-center px-6 py-3 text-black hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-center space-x-2">
      <span>Continue with Google</span>
      <img
        src={googleIcon}
        alt="Google logo"
        className="w-7 h-7"
      />
    </div>
  </button>
</div>
  );
};

export default GoogleAuth;
