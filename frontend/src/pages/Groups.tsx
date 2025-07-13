import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaPlus } from 'react-icons/fa';
import CreateGroup from '../components/CreateGroup';
import { apiGet } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Group {
  groupName: string;
  memberCount: number;
  groupId?: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const Groups: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  // TODO: Replace with actual user id from auth context or props
  const currentUserId = 1;
  const navigate = useNavigate();

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const data = await apiGet<Group[]>(`/groups?userId=${currentUserId}`);
      setGroups(data);
    } catch {
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
    // eslint-disable-next-line
  }, [currentUserId]);

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

      {loading ? (
        <div className="text-center text-gray-400 py-10">Loading groups...</div>
      ) : (
        <ul className="space-y-6">
          {groups.map((group, index) => (
            <motion.li
              key={group.groupName}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="flex items-center justify-between bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-teal-400 cursor-pointer"
              onClick={() => navigate(`/groups/${encodeURIComponent(group.groupName)}?groupId=${group.groupId || ''}`)}
            >
              <div className="flex items-center gap-3 text-teal-700 font-semibold">
                <FaUsers className="text-teal-500 text-xl" />
                {group.groupName}
              </div>
              <span className="text-sm text-gray-500">{group.memberCount} members</span>
            </motion.li>
          ))}
          {groups.length === 0 && (
            <li className="text-center text-gray-400">No groups found.</li>
          )}
        </ul>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="Btn mt-10 w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition"
        onClick={() => setShowCreate(true)}
      >
        <FaPlus /> Create New Group
      </motion.button>

      <CreateGroup
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        currentUserId={currentUserId}
        onGroupCreated={fetchGroups}
      />
    </motion.div>
  );
};

export default Groups;
