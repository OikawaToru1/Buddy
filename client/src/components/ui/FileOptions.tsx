



function FileOptions() {
  return (
    <div className="w-full h-full md:w-1/3 mr-4 bg-gray-800/50 rounded-xl border border-gray-600/50 ">
      <h1 className="text-center pt-2 text-sm font-semibold">
        Options you can try
      </h1>
      <div className="w-full h-1/5 p-4 bg-gray-600/50 flex flex-wrap justify-start  gap-x-2 rounded-lg">

        <div className="w-1/3 h-[50px] bg-gray-800/90 rounded-2xl text-center">Quiz</div>
        <div className="w-1/3 h-[50px] bg-gray-800/90 rounded-2xl text-center">Summary</div>
        <div className="w-1/3 h-[50px] bg-gray-800/90 rounded-2xl text-center">Explain like I'm 5</div>
      </div>
    </div>
  );
}

export default FileOptions