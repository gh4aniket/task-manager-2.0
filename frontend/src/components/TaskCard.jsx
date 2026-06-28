import React from "react"
import Progress from "./Progress"
import moment from "moment"
import AvatarGroup from "./AvatarGroup"
import { FaFileLines } from "react-icons/fa6"

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/20 text-amber-300 border border-amber-500/30"

      case "In Progress":
        return "bg-sky-500/20 text-sky-300 border border-sky-500/30"

      case "Completed":
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"

      default:
        return "bg-amber-500/20 text-amber-300 border border-amber-500/30"
    }
  }

  const getPriorityTagColor = () => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-300 border border-red-500/30"

      case "Medium":
        return "bg-orange-500/20 text-orange-300 border border-orange-500/30"

      case "Low":
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"

      default:
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
    }
  }

  return (
    <div
      className="rounded-2xl bg-slate-800/70 backdrop-blur-md py-4 border border-slate-700 shadow-lg shadow-slate-950/40 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-indigo-500/10"
      onClick={onClick}
    >
      <div className="flex items-end gap-3 px-4">
        <div
          className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-1 rounded-xl`}
        >
          {status}
        </div>

        <div
          className={`text-[11px] font-medium ${getPriorityTagColor()} px-4 py-1 rounded-xl`}
        >
          {priority} Priority
        </div>
      </div>

      <div
        className={`px-4 border-l-[3px] ${
          status === "In Progress"
            ? "border-cyan-400"
            : status === "Completed"
            ? "border-emerald-400"
            : "border-violet-400"
        }`}
      >
        <p className="text-lg font-semibold text-slate-100 mt-4 line-clamp-2">
          {title}
        </p>

        <p className="text-sm text-slate-400 mt-1.5 line-clamp-2 leading-[18px]">
          {description}
        </p>

        <p className="text-[13px] text-slate-300 font-medium mt-2 mb-2 leading-[18px]">
          Task Done:{" "}
          <span className="font-semibold text-white">
            {completedTodoCount} / {todoChecklist.length || 0}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between my-1">
          <div>
            <label className="text-xs text-slate-400">Start Date</label>

            <p className="text-[13px] font-medium text-slate-100">
              {moment(createdAt).format("Do MMM YYYY")}
            </p>
          </div>

          <div>
            <label className="text-xs text-slate-400">Due Date</label>

            <p className="text-[13px] font-medium text-slate-100">
              {moment(dueDate).format("Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <AvatarGroup avatars={assignedTo || []} />

          {attachmentCount > 0 && (
            <div className="flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/20 px-2.5 py-1.5 rounded-xl">
              <FaFileLines className="text-indigo-300" />

              <span className="text-xs text-slate-100">
                {attachmentCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskCard