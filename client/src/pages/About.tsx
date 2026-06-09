import {NavLink} from 'react-router'
export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 antialiased flex flex-col selection:bg-blue-500/30 selection:text-blue-200">
      {/* Universal Page Identity Top Section */}
      <div className="w-full bg-gray-900/30 border-b border-gray-900 py-8 text-center shrink-0 flex justify-between items-center px-6 lg:px-16">
        {/* Clickable Brand Title Label matching Landing Page styling */}
        <NavLink
          to="/"
          className="text-2xl font-bold tracking-tight select-none mb-1 hover:opacity-90 transition-opacity flex items-center justify-center gap-0.5"
        >
          Buddy<span className="text-blue-500 font-black">.</span>
        </NavLink>
        <p className="text-sm text-gray-400 font-light tracking-wide uppercase flex flex-col gap-2" >
            About Us
          <span className=" text-[14px] font-bold text-gray-500 uppercase tracking-[0.2em] block">
            Platform Documentation
          </span>
        </p>
        <NavLink
          to="/login"
          className="text-xl font-bold tracking-tight select-none mb-1 hover:opacity-90 transition-opacity flex items-center justify-center gap-0.5"
        >
          Login
        </NavLink>
      </div>

      {/* Centered App Layout Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-16 flex flex-col gap-12 justify-center">
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Fixed Core Message (Spans 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2  px-3 py-1 self-start shadow-sm">
              
              <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-400">
                The Mission
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Meet your ultimate <br className="hidden sm:inline" />
              knowledge{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                companion.
              </span>
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed font-normal">
              Buddy was born out of a simple philosophy: interacting with
              complex documents shouldn't feel like a chore. We strip away
              complex navigation bars and busy dashboard widgets to give you a
              pristine, direct conversation line into your data.
            </p>

            <div className="hidden lg:flex items-center gap-2 mt-4 text-xs font-mono text-gray-600">
              <span>Minimal</span>
              <span>&bull;</span>
              <span>Context Aware</span>
              <span>&bull;</span>
              <span>Lightweight</span>
            </div>
          </div>

          {/* Right Column: High-Density Context Cards (Spans 7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Context Box 1 */}
            <div className="p-5 bg-gray-900/40 border border-gray-800/80 rounded-2xl flex flex-col gap-3 shadow-md">
              <div className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm font-bold">
                🎯
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-200 mb-1">
                  Direct Document Context
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Upload files directly to your session sandbox. Buddy indexes
                  your texts immediately, maintaining perfect conceptual context
                  over deep paragraphs without skipping notes.
                </p>
              </div>
            </div>

            {/* Context Box 2 */}
            <div className="p-5 bg-gray-900/40 border border-gray-800/80 rounded-2xl flex flex-col gap-3 shadow-md">
              <div className="h-8 w-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-sm font-bold">
                ⚡
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-200 mb-1">
                  Interactive Toolkit
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Don't just chat. Instantly spin up dynamic matching quizzes,
                  compile extensive markdown summaries, or extract multi-layered
                  simple breakdowns inside your utility pane.
                </p>
              </div>
            </div>

            {/* Context Box 3 */}
            <div className="p-5 bg-gray-900/40 border border-gray-800/80 rounded-2xl flex flex-col gap-3 shadow-md">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-sm font-bold">
                🛡️
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-200 mb-1">
                  Ephemeral & Private
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Your data remains strictly your own. Workspace files are
                  securely bound directly to your session profile, ready to be
                  scrubbed or referenced entirely at your command.
                </p>
              </div>
            </div>

            {/* Interactive Call to Action Card */}
            <div className="p-5 bg-gradient-to-br from-gray-900/60 to-gray-900/20 border border-gray-800 rounded-2xl flex flex-col justify-between items-start border-dashed min-h-[160px]">
              <div>
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                  Ready to test it?
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Drop a PDF into the dashboard workspace and see the speed for
                  yourself.
                </p>
              </div>
              <a
                href="/signup"
                className="w-full text-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 py-2 rounded-xl transition-all shadow-md active:scale-95"
              >
                Open Dashboard
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-[60px] flex justify-center items-center px-6 bg-gray-950 border-t border-gray-900 text-center shrink-0">
        <p className="text-xs text-gray-600 font-light tracking-wide">
          &copy; 2026 Buddy. All rights reserved. Built for clarity.
        </p>
      </footer>
    </div>
  );
}