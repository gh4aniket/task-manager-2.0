import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/axioInstance"
import { FaUsers } from "react-icons/fa"
import Modal from "./Modal"
import AvatarGroup from "./AvatarGroup"

const SelectedUsers = ({ selectedUser, setSelectedUser }) => {
  const [allUsers, setAllUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tempSelectedUser, setTempSelectedUser] = useState([])

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/users/get-users")

      if (response.data?.length > 0) {
        setAllUsers(response.data)
      }
    } catch (error) {
      console.log("Error fetching users:", error)
    }
  }

  const toggleUserSelection = (userId) => {
    setTempSelectedUser((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    )
  }

  const handleAssign = () => {
    setSelectedUser(tempSelectedUser)
    setIsModalOpen(false)
  }

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUser.includes(user._id))
    .map((user) => user.profileImageUrl)

  useEffect(() => {
    getAllUsers()

    return () => {}
  }, [])

  useEffect(() => {
    if (selectedUser.length === 0) {
      setTempSelectedUser([])
    }

    return () => {}
  }, [selectedUser])

  return (
    <div className="space-y-4 mt-2">
      {selectedUserAvatars.length === 0 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          type="button"
        >
          <FaUsers className="text-lg" />
          Add Members
        </button>
      )}

      {selectedUserAvatars.length > 0 && (
        <div
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => setIsModalOpen(true)}
        >
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Select User"}
      >
        <div className="space-y-3 h-[60vh] overflow-y-auto pr-2">
          {allUsers?.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/70 backdrop-blur-md border border-slate-700 hover:border-indigo-500/40 transition-all duration-300"
            >
              <img
                src={user?.profileImageUrl}
                alt={user?.name}
                className="w-10 h-10 rounded-full border-2 border-slate-600 object-cover"
              />

              <div className="flex-1">
                <p className="font-medium text-slate-100">{user?.name}</p>

                <p className="text-[13px] text-slate-400">
                  {user?.email}
                </p>
              </div>

              <input
                type="checkbox"
                checked={tempSelectedUser.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 accent-indigo-500 cursor-pointer"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl transition-all duration-300 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            CANCEL
          </button>

          <button
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 cursor-pointer"
            onClick={handleAssign}
          >
            DONE
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default SelectedUsers