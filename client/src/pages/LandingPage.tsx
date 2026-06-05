
function LandingPage() {


  return (
    <div className="landing-page h-screen">
      <header className="h-[5vh] landing-header flex justify-between items-center p-4 bg-gray-900 border-b border-gray-600/50 text-white">
        <h1 className="font-mono text-2xl p-4 cursor-pointer select-none"><a href="/">Buddy</a></h1>
        <nav className="flex gap-16">
          <a href="/login" className="nav-link">
            Login
          </a>
          <a href="" className="nav-link">
            About
          </a>
        </nav>
      </header>
      <main className="landing-main flex flex-col items-center justify-center h-[90vh] bg-gray-900 text-white">
        <h1 className="text-5xl font-bold mb-8">Welcome to Buddy</h1>
        <h2 className="text-xl mb-12 text-center max-w-2xl">
          Your ultimate companion for easily understanding notes. <br></br>
          <p className="text-sm text-gray-400">(Cheaper copy of notebooklm)</p>
         
          Sign up now to get started!
        </h2>
        <a
          href="/signup"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
        >
          Get Started
        </a>
      </main>

      <footer className="landing-footer flex justify-center h-[5vh] items-center p-4 bg-gray-900 border-t border-gray-600/50 text-white bottom-0 w-full">
        <p>&copy; 2026 Buddy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage