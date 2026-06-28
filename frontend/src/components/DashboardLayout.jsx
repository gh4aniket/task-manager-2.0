import React from "react"
import { useSelector } from "react-redux"
import Navbar from "./Navbar"
import SideMenu from "./SideMenu"

const DashboardLayout = ({ children, activeMenu }) => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeMenu={activeMenu} />

      {currentUser && (
        <div className="flex flex-1">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="w-full">{children}</div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout
