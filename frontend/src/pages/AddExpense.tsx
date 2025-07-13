import React from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaUser, FaUsers, FaFileAlt } from "react-icons/fa";

const AddExpense: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className=" max-w-xl mx-auto mt-10 p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-white to-teal-200"
    >
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-teal-600 to-green-400 text-transparent bg-clip-text flex items-center justify-center gap-2">
        <FaMoneyBillWave className="text-green-500 mr-3 text-3xl" />
         Add Expense
      </h2>

      <form className="space-y-6">
        <div className="inputGroup">
          <input type="text" required />
          <label className="text-gray-700 font-semibold items-center gap-2">
            <div className="flex items-center gap-2">
              <FaFileAlt className="text-teal-500" />
            Description
            </div>
          </label>
        </div>        <div className="inputGroup">
          <input type="text" required />
          <label className="text-gray-700 font-semibold items-center gap-2">
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500" />
            Amount
            </div>
          </label>
        </div>
        <div className="inputGroup">
          <input type="text" required />
          <label className="text-gray-700 font-semibold items-center gap-2">
            <div className="flex items-center gap-2">
              <FaUser className="text-blue-500" />
            Paid By
            </div>
          </label>
        </div>
        <div className="inputGroup">
          <input type="text" required />
          <label className="text-gray-700 font-semibold items-center gap-2">
            <div className="flex items-center gap-2">
              <FaUsers className="text-purple-500" />
              Split With
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="Btn w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition"
        >
          ➕ Add Expense
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddExpense;
