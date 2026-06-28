import React from "react"

const UserCard = ({ userInfo }) => {
  return (
    <div className="p-4 rounded-2xl bg-slate-800/70 backdrop-blur-md border border-slate-700 shadow-lg shadow-slate-950/40 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-indigo-500/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userInfo?.profileImageUrl}
            alt={userInfo?.name}
            className="h-12 w-12 rounded-full object-cover border-2 border-slate-600"
          />

          <div>
            <p className="text-lg font-semibold text-slate-100">
              {userInfo?.name}
            </p>

            <p className="text-sm text-slate-400">{userInfo?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="pending"
        />

        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="in-progress"
        />

        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="completed"
        />
      </div>
    </div>
  )
}

export default UserCard

const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "pending":
        return "bg-amber-500/20 text-amber-300 border border-amber-500/30"

      case "in-progress":
        return "bg-sky-500/20 text-sky-300 border border-sky-500/30"

      case "completed":
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"

      default:
        return "bg-amber-500/20 text-amber-300 border border-amber-500/30"
    }
  }

  return (
    <div
      className={`flex flex-1 text-[10px] font-medium ${getStatusTagColor()} px-4 py-1 rounded-xl items-center justify-center gap-1`}
    >
      <span className="text-[12px] font-semibold">{count}</span>
      <span>{label}</span>
    </div>
  )
}