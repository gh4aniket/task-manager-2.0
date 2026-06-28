import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DashboardLayout from "../../components/DashboardLayout"
import axiosInstance from "../../utils/axioInstance"
import moment from "moment"
import RecentTasks from "../../components/RecentTasks"
import CustomPieChart from "../../components/CustomPieChart"
import CustomBarChart from "../../components/CustomBarChart"

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"]

const UserDashboard = () => {
  const { currentUser } = useSelector((state) => state.user)

  const [dashboardData, setDashboardData] = useState([])
  const [pieChartData, setPieChartData] = useState([])
  const [barChartData, setBarChartData] = useState([])

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || {}
    const taskPriorityLevels = data?.taskPriorityLevel || {}

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ]

    setPieChartData(taskDistributionData)

    const priorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ]

    setBarChartData(priorityLevelData)
  }

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/tasks/user-dashboard-data")

      if (response.data) {
        setDashboardData(response.data)
        prepareChartData(response.data?.charts || null)
      }
    } catch (error) {
      console.log("Error fetching user dashboard data: ", error)
    }
  }

  useEffect(() => {
    getDashboardData()

    return () => {}
  }, [])

  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className="min-h-screen p-8 space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-indigo-950/80 to-slate-900/80 p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(79,70,229,0.15)]">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"></div>

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-400 bg-clip-text text-transparent">
                Welcome, {currentUser?.name}
              </h2>

              <p className="mt-2 text-slate-300 tracking-wide">
                {moment().format("dddd, Do MMMM YYYY")}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {dashboardData && (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-3xl border border-blue-500/20 bg-slate-900/50 p-7 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-blue-500/10">
              <h3 className="text-sm font-medium uppercase tracking-widest text-slate-400">
                Total Tasks
              </h3>

              <p className="mt-3 text-4xl font-bold text-white">
                {dashboardData?.charts?.taskDistribution?.All || 0}
              </p>
            </div>

            <div className="group rounded-3xl border border-yellow-500/20 bg-slate-900/50 p-7 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:shadow-yellow-500/10">
              <h3 className="text-sm font-medium uppercase tracking-widest text-slate-400">
                Pending Tasks
              </h3>

              <p className="mt-3 text-4xl font-bold text-white">
                {dashboardData?.charts?.taskDistribution?.Pending || 0}
              </p>
            </div>

            <div className="group rounded-3xl border border-green-500/20 bg-slate-900/50 p-7 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:shadow-green-500/10">
              <h3 className="text-sm font-medium uppercase tracking-widest text-slate-400">
                In Progress Tasks
              </h3>

              <p className="mt-3 text-4xl font-bold text-white">
                {dashboardData?.charts?.taskDistribution?.InProgress || 0}
              </p>
            </div>

            <div className="group rounded-3xl border border-red-500/20 bg-slate-900/50 p-7 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-400/40 hover:shadow-red-500/10">
              <h3 className="text-sm font-medium uppercase tracking-widest text-slate-400">
                Completed Tasks
              </h3>

              <p className="mt-3 text-4xl font-bold text-white">
                {dashboardData?.charts?.taskDistribution?.Completed || 0}
              </p>
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-7 backdrop-blur-xl shadow-xl">
            <h3 className="mb-6 text-xl font-bold text-white">
              Task Distribution
            </h3>

            <div className="h-64">
              <CustomPieChart
                data={pieChartData}
                label="Total Balance"
                colors={COLORS}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-7 backdrop-blur-xl shadow-xl overflow-hidden">
            <h3 className="mb-6 text-xl font-bold text-white">
              Task Priority Levels
            </h3>

            <div className="">
              <CustomBarChart data={barChartData} />
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <RecentTasks tasks={dashboardData?.recentTasks} />
      </div>
    </DashboardLayout>
  )
}

export default UserDashboard