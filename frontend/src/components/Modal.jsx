import React from "react"
import { IoMdClose } from "react-icons/io"

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-md mx-4 overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/90 backdrop-blur-xl shadow-2xl shadow-black/50 transform transition-all duration-300 ease-out">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
          <h3 className="text-xl font-semibold text-slate-100">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-700 transition-all duration-200 text-slate-400 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <IoMdClose className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-slate-300">{children}</div>
      </div>
    </div>
  )
}

export default Modal