
function LandingPage() {


  return (
    <div className="landing-page min-h-screen bg-gray-950 text-gray-100 flex flex-col justify-between antialiased selection:bg-blue-500/30 selection:text-blue-200">
      {/* Header */}
      <header className="h-[72px] flex justify-between items-center px-6 lg:px-16 bg-gray-950/70 backdrop-blur-md border-b border-gray-800/60 sticky top-0 z-50 shrink-0">
        <h1 className="text-xl font-bold tracking-tight cursor-pointer select-none">
          <a
            href="/"
            className="hover:opacity-90 transition-opacity flex items-center gap-1"
          >
            Buddy<span className="text-blue-500 font-black">.</span>
          </a>
        </h1>
        <nav className="flex items-center gap-8 text-sm font-medium text-gray-400">
          <a
            href="/about"
            className="hover:text-white transition-colors duration-200"
          >
            About
          </a>
          <a
            href="/login"
            className="text-gray-200 hover:text-white border border-gray-800 bg-gray-900/40 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 hover:border-gray-700 active:scale-95"
          >
            Sign In
          </a>
        </nav>
      </header>

      {/* Hero Content Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden max-w-4xl mx-auto w-full">
        {/* Subtle Decorative Background Accent (Not distracting, just premium depth) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Tiny Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 animate-fade-in shadow-sm">
          
          <span className="text-[11px] font-medium tracking-wider uppercase text-gray-400">
            Your personal document workspace
          </span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
          Welcome to your <br />
          ultimate study{" "}
          <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            companion
          </span>
        </h1>

        {/* Supporting Description Subtext */}
        <div className="flex flex-col items-center gap-3 max-w-xl mb-10">
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light">
            Organize, synthesize, and seamlessly interact with your personal
            notes and files. Built for absolute simplicity.
          </p>
          {/* Your funny sub-tag, styled cleanly so it looks witty, not sloppy */}
          <span className="inline-block font-mono text-[11px] bg-gray-900/60 border border-gray-800 text-gray-500 px-2.5 py-1 rounded-md">
            (A Wanna be NotebookLM But Lacking)
          </span>
        </div>

        {/* Call to Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <a
            href="/signup"
            className="w-full sm:w-auto text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/10 transition-all duration-200 transform active:scale-[0.98] text-center"
          >
            Get Started for Free
          </a>
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

export default LandingPage