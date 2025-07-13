import React from 'react';
import { motion } from 'framer-motion';
import { FaUserFriends, FaUserPlus } from 'react-icons/fa';

const friends = [
  { name: 'Alex', status: 'Settled up', color: 'text-gray-500' },
  { name: 'Priya', status: 'You owe ₹400', color: 'text-orange-500 font-semibold' },
  { name: 'Sam', status: 'Owes you ₹300', color: 'text-green-600 font-semibold' },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Friends: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-8 mt-10 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl"
    >
      <h2 className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        👫 Your Friends
      </h2>

      <ul className="space-y-6">
        {friends.map((friend, index) => (
          <motion.li
            key={friend.name}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="flex items-center justify-between bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-400"
          >
            <div className="flex items-center gap-3 text-blue-700 font-semibold">
              <FaUserFriends className="text-blue-500 text-xl" />
              {friend.name}
            </div>
            <span className={`${friend.color}`}>{friend.status}</span>
          </motion.li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="Btn mt-10 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
      >
        <FaUserPlus /> Add Friend
      </motion.button>
    </motion.div>
  );
};

export default Friends;
