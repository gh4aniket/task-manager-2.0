import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/axioInstance"
import { useDispatch, useSelector } from "react-redux"
import { signOutSuccess } from "../redux/slice/userSlice"
import { useNavigate } from "react-router-dom"
import { SIDE_MENU_DATA, USER_SIDE_MENU_DATA } from "../utils/data"

const SideMenu = ({ activeMenu }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [SideMenuData, setSideMenuData] = useState([])
  const { currentUser } = useSelector((state) => state.user)

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogut()
      return
    }

    navigate(route)
  }

  const handleLogut = async () => {
    try {
      const response = await axiosInstance.post("/auth/sign-out")

      if (response.data) {
        dispatch(signOutSuccess())
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentUser) {
      setSideMenuData(
        currentUser?.role === "admin"
          ? SIDE_MENU_DATA
          : USER_SIDE_MENU_DATA
      )
    }
  }, [currentUser])

  return (
    <div className="w-64 h-full bg-slate-950 border-r border-slate-600 flex flex-col px-5 py-8">
      {/* Profile */}
      <div className="flex flex-col items-center pb-8 border-b border-slate-800">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-700 mb-4">
          <img
            src={currentUser?.profileImageUrl || null}
            alt="Profile Image"
            className="w-full h-full object-cover"
          />
        </div>

        {currentUser?.role === "admin" && (
          <div className="mb-3 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 border border-indigo-500/20">
            Admin
          </div>
        )}

        <h5 className="text-lg font-semibold text-white">
          {currentUser?.name || ""}
        </h5>

        <p className="mt-1 text-sm text-slate-400 text-center">
          {currentUser?.email || ""}
        </p>
      </div>

      {/* Menu */}
      <div className="mt-8 flex-1">
        {SideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-4 px-4 py-3 mb-2 rounded-xl text-[15px] font-medium transition-all duration-200 ${
              activeMenu === item.label
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SideMenu