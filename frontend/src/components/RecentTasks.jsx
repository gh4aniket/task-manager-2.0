import moment from "moment"
import React from "react"
import { useNavigate } from "react-router-dom"

const RecentTasks = ({ tasks }) => {
  const navigate = useNavigate()

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Recent Tasks</h3>

      </div>

      <div className="p-6">
        {tasks?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Task Name
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Priority
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Created On
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-100">
                        {task.title}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.status === "Completed"
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : task.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.priority === "High"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : task.priority === "Medium"
                            ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                            : "bg-slate-700/50 text-slate-300 border border-slate-600"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {moment(task.createdAt).format("MMM Do, YYYY")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-400 text-center py-8">
            No recent tasks found
          </p>
        )}
      </div>
    </div>
  )
}

export default RecentTasks