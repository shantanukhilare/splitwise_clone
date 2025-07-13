import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/groups', label: 'Groups' },
  { to: '/friends', label: 'Friends' },
  { to: '/add-expense', label: 'Add Expense' },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens or user info here
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white shadow-lg rounded-b-xl backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        
        {/* Left Side: Logo & Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/dashboard"
            className="text-xl font-extrabold tracking-tight hover:scale-105 transition-transform duration-300"
          >
            Splitwise Clone
          </Link>

          {navLinks.map((link) => (
            <motion.div
              key={link.to}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                to={link.to}
                className="relative font-medium text-white hover:text-yellow-300 transition duration-300"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-300 transition-all duration-300 hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Logout */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="logout">
            <button className="sure" onClick={handleLogout}>
              <span></span>
              <p data-start="good luck!" data-text="Sure?" data-title="Logout"></p>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
