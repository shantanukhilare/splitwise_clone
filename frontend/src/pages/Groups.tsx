import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaPlus } from 'react-icons/fa';

const groups = [
  { name: 'Goa Trip', members: 3 },
  { name: 'Flatmates', members: 4 },
  { name: 'Office Lunch', members: 6 },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Groups: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-8 mt-10 bg-gradient-to-br from-white to-teal-50 rounded-3xl shadow-2xl"
    >
      <h2 className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent">
        🧑‍🤝‍🧑 Your Groups
      </h2>

      <ul className="space-y-6">
        {groups.map((group, index) => (
          <motion.li
            key={group.name}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="flex items-center justify-between bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-teal-400"
          >
            <div className="flex items-center gap-3 text-teal-700 font-semibold">
              <FaUsers className="text-teal-500 text-xl" />
              {group.name}
            </div>
            <span className="text-sm text-gray-500">{group.members} members</span>
          </motion.li>
        ))}
      </ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="Btn mt-10 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition"
      >
        <FaPlus /> Create New Group
      </motion.button>
    </motion.div>
  );
};

export default Groups;
