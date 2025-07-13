import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Select from "react-select";
import type { MultiValue } from "react-select";
import { apiGet, apiPost } from "../services/api";

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
      apiGet<UserResponse[]>(`/groups/user/${currentUserId}`)
        .then((res) => {
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
      await apiPost("/groups", {
        name: groupName,
        createdBy: currentUserId,
        userIds: selectedUsers.map((u) => u.value),
      });
      setGroupName("");
      setSelectedUsers([]);
      onClose();
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="bg-white rounded-xl p-8 max-w-md mx-auto mt-24 shadow-2xl outline-none"
      overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-6 text-teal-700">
        Create New Group
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="groupName"
            className="block mb-2 font-medium text-gray-700"
          >
            Group Name
          </label>
          <input
            id="groupName"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />
        </div>
        <div>
          <label
            htmlFor="members"
            className="block mb-2 font-medium text-gray-700"
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
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-teal-500 hover:bg-teal-600 text-white font-semibold"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Group"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateGroup;
