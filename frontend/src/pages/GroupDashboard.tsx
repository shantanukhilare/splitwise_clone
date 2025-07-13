import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { apiGet } from '../services/api';
import { FaArrowLeft, FaUserFriends, FaMoneyBillWave } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Member {
  id: number;
  name: string;
  email: string;
}

interface OweInfo {
  name: string;
  amount: number;
}

const GroupDashboard: React.FC = () => {
  const { groupName } = useParams<{ groupName: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUserId = 1; // TODO: Replace with actual user id
  // Get groupId from query param
  const groupId = React.useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('groupId') || '';
  }, [location.search]);

  const [members, setMembers] = useState<Member[]>([]);
  const [whoIOwe, setWhoIOwe] = useState<OweInfo[]>([]);
  const [whoOwesMe, setWhoOwesMe] = useState<OweInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch group members (simulate, replace with actual API if available)
        // Here we just show the groupName as a title and fake members for demo
        setMembers([
          { id: 1, name: 'shantanu', email: 'string' },
          { id: 2, name: 'himanshu', email: '2' },
          { id: 3, name: 'Mriganka', email: '3' },
        ]);
        // Fetch who you owe
        let owe: OweInfo[] = [];
        let owed: OweInfo[] = [];
        if (groupId) {
          owe = await apiGet<OweInfo[]>(`/expenses/whoYouOwe/${currentUserId}/${groupId}?userId=${currentUserId}&groupId=${groupId}`);
          owed = await apiGet<OweInfo[]>(`/expenses/WhoOwesYou/${currentUserId}/${groupId}?userId=${currentUserId}&groupId=${groupId}`);
        }
        setWhoIOwe(owe);
        setWhoOwesMe(owed);
      } catch {
        setWhoIOwe([]);
        setWhoOwesMe([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [groupName, currentUserId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-8 mt-10 bg-gradient-to-br from-white to-teal-50 rounded-3xl shadow-2xl"
    >
      <button
        className="mb-6 flex items-center gap-2 text-teal-600 hover:text-teal-800 font-semibold"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back to Groups
      </button>
      <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent">
        {groupName}
      </h2>
      {loading ? (
        <div className="text-center text-gray-400 py-10">Loading group dashboard...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaMoneyBillWave className="text-3xl text-teal-500 mb-2" />
            <h3 className="font-bold text-lg mb-2 text-teal-700">You Owe</h3>
            {whoIOwe.length === 0 ? (
              <span className="text-gray-400">You owe nothing!</span>
            ) : (
              <ul className="w-full space-y-2">
                {whoIOwe.map((item, i) => (
                  <li key={i} className="flex justify-between border-b pb-1">
                    <span>{item.name}</span>
                    <span className="text-red-500 font-semibold">₹{item.amount}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaMoneyBillWave className="text-3xl text-green-500 mb-2" />
            <h3 className="font-bold text-lg mb-2 text-green-700">Owes You</h3>
            {whoOwesMe.length === 0 ? (
              <span className="text-gray-400">No one owes you!</span>
            ) : (
              <ul className="w-full space-y-2">
                {whoOwesMe.map((item, i) => (
                  <li key={i} className="flex justify-between border-b pb-1">
                    <span>{item.name}</span>
                    <span className="text-teal-600 font-semibold">₹{item.amount}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h3 className="font-bold text-lg mb-4 text-teal-700 flex items-center gap-2">
          <FaUserFriends /> Members
        </h3>
        <ul className="flex flex-wrap gap-4">
          {members.map(member => (
            <li key={member.id} className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full font-medium shadow">
              {member.name}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default GroupDashboard;
