import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import CreateGroup from "../components/CreateGroup";
import { useNavigate } from "react-router-dom";
import { groupService, type Group } from "../services/groupService";

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
      const data = await groupService.getGroupsByUser(currentUserId);
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
      className="flex-col items-center justify-center max-w-3xl mx-auto p-8 mt-10 bg-gradient-to-br from-violet-900 via-violet-600 to-violet-900 rounded-3xl shadow-2xl"
    >
      <h2 className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-white to-violet-100 bg-clip-text text-transparent">
        🧑‍🤝‍🧑 Your Groups
      </h2>

      {loading ? (
        // <div className="text-center text-gray-400 py-10">Loading groups...</div>
<div className="loader"></div>        
      ) : (
        <ul className="space-y-6">
          {groups.map((group, index) => (
            <motion.li
              key={group.groupName}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="flex items-center justify-between bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-violet-500 cursor-pointer"
              onClick={() =>
                navigate(
                  `/groups/${encodeURIComponent(group.groupName)}?groupId=${
                    group.groupId || ""
                  }`
                )
              }
            >
              <div className="flex items-center gap-3 text-violet-700 font-semibold">
                <FaUsers className="text-violet-500 text-xl" />
                {group.groupName}
              </div>
              <span className="text-sm text-gray-500">
                {group.memberCount} members
              </span>
            </motion.li>
          ))}
          {groups.length === 0 && (
            <li className="text-center text-gray-400">No groups found.</li>
          )}
        </ul>
      )}

      {/* <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="Btn mt-10 w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
        onClick={() => setShowCreate(true)}
      >
        <FaPlus /> Create New Group
        // whileHover={{ scale: 1.05 }}
        // whileTap={{ scale: 0.95 }}
      </motion.button> */}
      <div className="flex justify-center">

      <button
         className="group group-hover:before:duration-500 w-100 my-6 flex justify-center group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 cursor-pointer flex items-center hover:text-rose-300 relative bg-neutral-800 h-16 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
         onClick={() => setShowCreate(true)}
         >
         {/* <FaPlus />   */}
         Create New Group
      </button> 
        </div>





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
