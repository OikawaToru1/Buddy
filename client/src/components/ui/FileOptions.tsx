import { useState } from "react";
import QuizBox from "./QuizBox";



function FileOptions() {
  const [activeOption, setActiveOption] = useState<string | null>(null);

  const createQuiz = () => {
    setActiveOption("createQuiz");
  }
  const generateSummary = () => {
    setActiveOption("generateSummary");
  }
  const explainLikeIm5 = () => {
    setActiveOption("explainLikeIm5");
  }
  return (
    <div className="w-full h-full md:w-1/3 mr-4 bg-gray-800/50 rounded-xl border border-gray-600/50 ">
      <h1 className="text-center pt-2 text-sm font-semibold">
        Options you can try
      </h1>
      <div className="w-full h-1/5 p-4 flex flex-wrap justify-start  gap-x-4 rounded-lg ">
        <button 
          className={`min-w-1/3 h-[50px] bg-gray-800/90 border border-gray-600/50 cursor-pointer  hover:bg-linear-to-r from-sky-500 to-blue-500 rounded-2xl text-center px-2 py-1 transition-all ease-in-out duration-300 ${activeOption === "createQuiz" ? "bg-linear-to-r from-sky-500 to-blue-500" : ""}`}
          onClick={createQuiz}
        >
          Create Quiz{" "}
        </button>
        <button 
          className={`min-w-1/3 h-[50px] bg-gray-800/90 border border-gray-600/50 rounded-2xl text-center px-2 py-1 hover:bg-linear-to-r from-purple-500 to-pink-500 transition-all ease-in-out duration-300 cursor-pointer ${activeOption === "generateSummary" ? "bg-linear-to-r from-purple-500 to-pink-500" : ""}`}
          onClick={generateSummary}
        >
          Generate Summary
        </button>
        <button 
          className={`min-w-1/3 h-[50px] bg-gray-800/90 border border-gray-600/50 rounded-2xl text-center px-2 py-1 hover:bg-linear-to-r from-green-800 to-teal-700 transition-all ease-in-out duration-300 cursor-pointer ${activeOption === "explainLikeIm5" ? "bg-linear-to-r from-green-800 to-teal-700" : ""}`}
          onClick={explainLikeIm5}
        >
          Explain like I'm 5
        </button>
      </div>

      <div className="w-full h-[600px] p-4">
        {activeOption === "createQuiz" && (
          <div className="h-full w-full">
            <QuizBox/>
          </div>
        )}
        {activeOption === "generateSummary" && (
          <div className="h-full w-full"  >
            <h2 className="text-lg font-semibold mb-2">Summary Generated!</h2>
            <p>Here is a summary of your file:</p>
            {/* Summary content goes here */}
          </div>
        )}
        {activeOption === "explainLikeIm5" && (
          <div className="h-full w-full">
            <h2 className="text-lg font-semibold mb-2">Explanation:</h2>
            <p>Here is an explanation of your file in simple terms:</p>
            {/* Explanation content goes here */}
          </div>
        )}
      </div>
      
    </div>
  );
}

export default FileOptions