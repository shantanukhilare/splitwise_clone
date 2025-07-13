import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl">
      
      {/* Header */}
      <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
        💸 Dashboard Overview
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* You Owe */}
        <div className="bg-gradient-to-br from-orange-200 to-orange-100 rounded-2xl shadow-lg p-6 text-center transition-transform hover:scale-105">
          <div className="text-5xl mb-3">📤</div>
          <h3 className="text-xl font-bold text-orange-800 mb-1">You Owe</h3>
          <p className="text-3xl font-extrabold text-orange-700">₹1,200</p>
        </div>

        {/* You Are Owed */}
        <div className="bg-gradient-to-br from-blue-200 to-blue-100 rounded-2xl shadow-lg p-6 text-center transition-transform hover:scale-105">
          <div className="text-5xl mb-3">📥</div>
          <h3 className="text-xl font-bold text-blue-800 mb-1">You Are Owed</h3>
          <p className="text-3xl font-extrabold text-blue-700">₹2,500</p>
        </div>

        {/* Total Balance */}
        <div className="bg-gradient-to-br from-green-200 to-green-100 rounded-2xl shadow-lg p-6 text-center transition-transform hover:scale-105">
          <div className="text-5xl mb-3">💰</div>
          <h3 className="text-xl font-bold text-green-800 mb-1">Total Balance</h3>
          <p className="text-3xl font-extrabold text-green-700">₹1,300</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-5">📝 Recent Activity</h3>
        <ul className="space-y-4">
          <li className="bg-white border-l-4 border-teal-400 p-5 rounded-lg shadow-sm hover:shadow-md transition">
            <span className="text-gray-800">
              <strong className="text-teal-600">You</strong> paid <strong className="text-teal-600">Alex</strong> 
              <span className="text-orange-500 font-semibold"> ₹500 </span> for Dinner 🍽️
            </span>
          </li>
          <li className="bg-white border-l-4 border-purple-400 p-5 rounded-lg shadow-sm hover:shadow-md transition">
            <span className="text-gray-800">
              <strong className="text-teal-600">Priya</strong> added an expense: 
              <span className="text-orange-500 font-semibold"> ₹1,200 </span> for Trip 🧳
            </span>
          </li>
          <li className="bg-white border-l-4 border-green-400 p-5 rounded-lg shadow-sm hover:shadow-md transition">
            <span className="text-gray-800">
              <strong className="text-teal-600">You</strong> settled up with 
              <strong className="text-teal-600"> Sam </strong> ✅
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
