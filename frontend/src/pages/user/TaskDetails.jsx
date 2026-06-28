import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosInstance from "../../utils/axioInstance"
import DashboardLayout from "../../components/DashboardLayout"
import moment from "moment"
import AvatarGroup from "../../components/AvatarGroup"
import { FaExternalLinkAlt } from "react-icons/fa"

const TaskDetails = () => {
  const { id } = useParams()
  const [task, setTask] = useState(null)

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-sky-300 bg-sky-500/20 border border-sky-500/30"

      case "Completed":
        return "text-emerald-300 bg-emerald-500/20 border border-emerald-500/30"

      default:
        return "text-violet-300 bg-violet-500/20 border border-violet-500/30"
    }
  }

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`)

      if (response.data) {
        setTask(response.data)
      }
    } catch (error) {
      console.log("Error fetching task details: ", error)
    }
  }

  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist]

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed

      try {
        const response = await axiosInstance.put(`/tasks/${id}/todo`, {
          todoChecklist,
        })

        if (response.status === 200) {
          setTask(response.data?.task || task)
        } else {
          todoChecklist[index].completed =
            !todoChecklist[index].completed
        }
      } catch (error) {
        todoChecklist[index].completed =
          !todoChecklist[index].completed
      }
    }
  }

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link
    }

    window.open(link, "_blank")
  }

  useEffect(() => {
    if (id) {
      getTaskDetailsById()
    }
  }, [id])

  return (
    <DashboardLayout activeMenu={"My Tasks"}>
      <div className="min-h-screen px-8 py-6 bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
            <div className="md:col-span-3 space-y-6">
              <div className="bg-slate-800/70 rounded-3xl backdrop-blur-md border border-slate-700 p-8 shadow-xl transition-all hover:border-indigo-500/30">
                <div className="flex flex-col space-y-4">
                  <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
                    {task?.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3">
                    <div
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${getStatusTagColor(
                        task?.status
                      )}`}
                    >
                      {task?.status}

                      <span className="ml-2 w-2 h-2 rounded-full bg-current opacity-80"></span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <InfoBox
                    label="Description"
                    value={task?.description}
                  />
                </div>

                <div className="grid grid-cols-12 gap-6 mt-6">
                  <div className="col-span-6 md:col-span-4">
                    <InfoBox
                      label="Priority"
                      value={task?.priority}
                    />
                  </div>

                  <div className="col-span-6 md:col-span-4">
                    <InfoBox
                      label="Due Date"
                      value={
                        task?.dueDate
                          ? moment(task?.dueDate).format(
                              "Do MMM YYYY"
                            )
                          : "N/A"
                      }
                    />
                  </div>

                  <div className="col-span-6 md:col-span-4">
                    <label className="text-xs font-medium text-slate-400">
                      Assigned To
                    </label>

                    <div className="mt-2">
                      <AvatarGroup
                        avatars={
                          task?.assignedTo?.map(
                            (item) => item?.profileImageUrl
                          ) || []
                        }
                        maxVisible={5}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-xs font-medium text-slate-400">
                    Todo Checklist
                  </label>

                  <div className="mt-2">
                    {task?.todoChecklist?.map((item, index) => (
                      <TodoCheckList
                        key={`todo_${index}`}
                        text={item.text}
                        isChecked={item?.completed}
                        onChange={() =>
                          updateTodoChecklist(index)
                        }
                      />
                    ))}
                  </div>
                </div>

                {task?.attachments?.length > 0 && (
                  <div className="mt-6">
                    <label className="text-xs font-medium text-slate-400">
                      Attachments
                    </label>

                    <div className="mt-2">
                      {task?.attachments?.map((link, index) => (
                        <Attachment
                          key={`link_${index}`}
                          link={link}
                          index={index}
                          onClick={() =>
                            handleLinkClick(link)
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default TaskDetails

const InfoBox = ({ label, value }) => {
  return (
    <>
      <label className="text-xs font-medium text-slate-400">
        {label}
      </label>

      <p className="text-[13px] md:text-sm font-medium text-slate-100 mt-1">
        {value}
      </p>
    </>
  )
}

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-700/40 transition-all duration-300">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 accent-indigo-500 cursor-pointer"
      />

      <p className="text-sm text-slate-200">{text}</p>
    </div>
  )
}

const Attachment = ({ link, index, onClick }) => {
  return (
    <div
      className="flex justify-between bg-slate-900/60 border border-slate-700 px-4 py-3 rounded-xl mb-3 cursor-pointer hover:border-indigo-500/30 hover:bg-slate-900 transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex flex-1 items-center gap-3 overflow-hidden">
        <span className="text-xs text-slate-500 font-semibold mr-2">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>

        <p className="text-xs text-slate-200 truncate">
          {link}
        </p>
      </div>

      <FaExternalLinkAlt className="text-slate-400" />
    </div>
  )
}