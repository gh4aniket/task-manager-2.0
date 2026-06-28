import React from "react"

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />

        {/* Animated Glow 1 */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />

        {/* Animated Glow 2 */}
        <div
          className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Animated Glow 3 */}
        <div
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Left Section */}
      <div className="relative z-10 flex w-full items-center justify-center px-6 py-10 md:w-1/2">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/60 p-10 shadow-2xl backdrop-blur-xl">
          {children}
        </div>
      </div>

      {/* Right Section */}
      <div className="relative hidden md:flex w-1/2 items-center justify-center overflow-hidden">
        {/* Floating Glass Card */}
        <div className="relative z-10 max-w-lg px-10">
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-10 backdrop-blur-xl shadow-2xl">
            

            <h1 className="mb-6 text-5xl font-bold leading-tight text-white">
              Manage your team,
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                beautifully.
              </span>
            </h1>

            <p className="text-lg leading-8 text-slate-300">
              Organize projects, assign tasks, track progress, and collaborate
              seamlessly with your team in one modern workspace.
            </p>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-24 right-20 h-32 w-32 rounded-full border border-white/10" />

        <div className="absolute bottom-20 left-16 h-52 w-52 rounded-full border border-indigo-500/20" />

        <div className="absolute top-1/2 right-1/3 h-16 w-16 rounded-full bg-cyan-400/20 blur-xl" />
      </div>
    </div>
  )
}

export default AuthLayout