import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/groups', label: 'Groups' },
  { to: '/friends', label: 'Friends' },
  { to: '/add-expense', label: 'Expense' },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens or user info here
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  // Animation variants for staggered nav links
  const navListVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };


  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-gradient-to-r from-blue-600 via-violet-600 to-violet-900 text-white shadow-lg rounded-b-xl backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        {/* Left Side: Logo & Links */}
        <div className="flex items-center gap-8">
          <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/dashboard"
              className="text-3xl font-normal text-gradient-to-b from-white to-violet-400 tracking-tight hover:scale-105 transition-transform duration-300"
            >
              Eazy Splitter
            </Link>
          </motion.div>

          <motion.div
            className="flex"
            variants={navListVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link) => (
              <button className="uiverseBtn" data-text="Awesome">
                <Link
                  to={link.to}
                  className="font-medium text-white hover:text-yellow-300 transition duration-300 "
                >
                  <span className="actual-text">&nbsp;{link.label}&nbsp;</span>
                  <span aria-hidden="true" className="hover-text">&nbsp;{link.label}&nbsp;</span>
                </Link>
              </button>
            ))}
          </motion.div> 
          {/* <button className="button" data-text="Awesome">
    <span className="actual-text">&nbsp;uiverse&nbsp;</span>
    <span aria-hidden="true" className="hover-text">&nbsp;uiverse&nbsp;</span>
</button> */}

        </div>

        {/* Right Side: Logout */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95, rotate: -2 }}
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
