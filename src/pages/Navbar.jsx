import { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAuth } from '../context/AuthContext'; // adjust path as needed
import { Link, useNavigate } from 'react-router-dom';
import mainLogo from '../assets/skillMirror-logo-test.png'
import { auth } from '../firebase';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsMenuOpen(false); // Close mobile menu after logout
    } catch (err) {
      console.error('Logout Failed', err.message);
    }
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-700">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and nameee -------------------------------------------------------------------------*/}
          <div className="flex-shrink-0 flex items-center">
            <img src={mainLogo}
                    alt="Google logo"
                    className="w-20"></img>
            <span className="text-xl font-bold text-white">SkillMirror</span>
          </div>
          
          {/* Center Navigation Menu */}
          <div className='hidden md:flex md:items-center md:space-x-4 flex-1 justify-center'>
            {user && (
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">Dashboard</Link>
                <a href="#why-skillmirror" className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">Practice</a>
                <a href='#working' className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">Streaks</a>
                <a href='#contact-us' className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">Linked Accounts</a>
                <a href='#contact-us' className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">Rankings</a>
              </div>
            )}
            {!user && (
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">Home</Link>
                <a href="#why-skillmirror" className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">Features</a>
                <a href='#working' className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">About</a>
                <a href='#contact-us' className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">Contact</a>
              </div>
            )}
          </div>
          
          {/* Right side - Account dropdown and Auth buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4 flex-shrink-0">
            {/* Dropdown---------------------------------------------- */}
            {user && (
              <Menu as="div" className="relative">
                <Menu.Button className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium inline-flex items-center">
                  {auth.currentUser?.displayName || "Account"}
                  <ChevronDownIcon className="ml-1 h-4 w-4" aria-hidden="true" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-balance text-gray-700`}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/settings"
                          className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-balance text-gray-700`}
                        >
                          Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${active ? 'bg-gray-100' : ''} w-full text-left px-4 py-2 text-balance text-gray-700`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          {!user && (
            <div className="hidden md:ml-4 md:flex md:items-center md:space-x-4">
              <Link to="/signin" className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">
                Login
              </Link>
              <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-balance font-medium hover:bg-indigo-100 hover:text-black transition-colors">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-amber-400 hover:bg-gray-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={closeMobileMenu} className="text-gray-100 hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            {!user && (
              <div>
                <Link to="/dsa" onClick={closeMobileMenu} className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">Features</Link>
                <Link to="/dsa" onClick={closeMobileMenu} className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">About</Link>
                <Link to="/dsa" onClick={closeMobileMenu} className="text-white hover:text-amber-200 px-3 py-2 rounded-md text-balance font-medium">Contact</Link>

              </div>
            )}
            {user && (
              <>
                <Link to="/profile" onClick={closeMobileMenu} className="text-gray-100 hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                <Link to="/dashboard" onClick={closeMobileMenu} className="text-gray-100 hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium">Settings</Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-gray-100 hover:text-amber-400 block w-full px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/signin" onClick={closeMobileMenu} className="text-gray-100 hover:text-amber-400 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/signup" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
