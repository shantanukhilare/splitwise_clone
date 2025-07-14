import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Modal from "react-modal";
import Select from "react-select";
import type { MultiValue } from "react-select";
import { groupService } from "../services/groupService";

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

interface UserResponse {
  id: number;
  user: User;
}

interface CreateGroupProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: number;
  onGroupCreated?: () => void;
}

interface Option {
  value: number;
  label: string;
}

const CreateGroup: React.FC<CreateGroupProps> = ({
  isOpen,
  onClose,
  currentUserId,
  onGroupCreated,
}) => {
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      groupService
        .getGroupsForUser(currentUserId)
        .then((res: UserResponse[]) => {
          const uniqueUsers: { [id: number]: User } = {};
          res.forEach((item) => {
            if (item.user && !uniqueUsers[item.user.id]) {
              uniqueUsers[item.user.id] = item.user;
            }
          });
          setUsers(Object.values(uniqueUsers));
        })
        .catch(() => setUsers([]));
    }
  }, [isOpen, currentUserId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await groupService.createGroup({
        name: groupName,
        createdBy: currentUserId,
        userIds: selectedUsers.map((u) => u.value),
      });
      setGroupName("");
      setSelectedUsers([]);
      onClose();
      toast.success("Group created successfully!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "#7c3aed",
          color: "#fff",
          fontWeight: 600,
          borderRadius: "0.75rem",
        },
        icon: false,
      });
      if (onGroupCreated) onGroupCreated();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create group");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        className="bg-transparent p-0 max-w-2xl w-full mx-auto mt-20 outline-none border-none shadow-none"
        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="bg-white rounded-2xl p-12 shadow-2xl border border-violet-300 w-full"
        >
          <h2 className="text-3xl font-bold mb-8 text-violet-700">
            Create New Group
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="groupName"
                className="block mb-2 font-semibold text-violet-700"
              >
                Group Name
              </label>
              <input
                id="groupName"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full border border-violet-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400 text-violet-900"
                required
              />
            </div>
            <div>
              <label
                htmlFor="members"
                className="block mb-2 font-semibold text-violet-700"
              >
                Select Members
              </label>
              <Select
                isMulti
                options={users.map((u) => ({ value: u.id, label: u.name }))}
                value={selectedUsers}
                onChange={(selected: MultiValue<Option>) =>
                  setSelectedUsers(selected as Option[])
                }
                classNamePrefix="react-select"
                placeholder="Choose users..."
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: '#a78bfa', // violet-400
                    boxShadow: '0 0 0 2px #a78bfa33',
                    '&:hover': { borderColor: '#7c3aed' },
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: '#ede9fe', // violet-100
                    color: '#7c3aed',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? '#a78bfa' : state.isFocused ? '#ede9fe' : undefined,
                    color: state.isSelected ? '#fff' : '#7c3aed',
                    cursor: 'pointer',
                  }),
                }}
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg bg-violet-100 hover:bg-violet-200 text-violet-700 font-semibold transition-colors duration-200 cursor-pointer"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors duration-200 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Group"}
              </button>
            </div>
          </form>
        </motion.div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default CreateGroup;
