import { useState } from "react";
import axios from "axios";
import QuizBox from "./QuizBox";
import SummaryDisplay from "./SummaryDisplay";



function FileOptions(selectedFile : {fileName: string, path: string} | null) {
  const [activeOption, setActiveOption] = useState<string | null>(null);

  const createQuiz = () => {
    setActiveOption("createQuiz");
    axios.post("http://localhost:3000/api/files/create-quiz", {fileName: selectedFile?.fileName || ""}, { withCredentials: true })
      .then((res) => {
        console.log("Quiz created successfully: ", res.data);
      })
      .catch((err) => {
        console.log(err, "Error creating quiz");
      });

  }
  const generateSummary = () => {
    setActiveOption("generateSummary");
    axios.post("http://localhost:3000/api/files/generate-summary", {fileName: selectedFile?.fileName || ""}, { withCredentials: true })
      .then((res) => {
        console.log("Summary generated successfully: ", res.data);
      })
      .catch((err) => {
        console.log(err, "Error generating summary");
      });
  }
  const explainLikeIm5 = () => {
    setActiveOption("explainLikeIm5");
    axios.post("http://localhost:3000/api/files/explain-like-im-5", {fileName: selectedFile?.fileName || ""}, { withCredentials: true })
      .then((res) => {
        console.log("Explanation generated successfully: ", res.data);
      })
      .catch((err) => {
        console.log(err, "Error generating explanation");
      });
  }
  return (
    <div className="w-full h-full md:w-1/3 mr-4 bg-gray-800/50 rounded-xl border border-gray-600/50 flex flex-col overflow-hidden shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="border-b border-gray-700/60 h-[56px] flex items-center justify-center shrink-0">
        <h1 className="text-sm font-semibold text-gray-300 tracking-wide">
          Options you can try
        </h1>
      </div>

      {/* Button Grid Section */}
      <div className="p-4 grid grid-cols-2 gap-3 shrink-0">
        <button
          className={`h-[52px] rounded-xl text-xs font-semibold text-center px-3 transition-all duration-300 ease-in-out border cursor-pointer active:scale-95 flex items-center justify-center
        ${
          activeOption === "createQuiz"
            ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white border-transparent shadow-lg shadow-blue-500/20"
            : "bg-gray-700/30 text-gray-300 border-gray-600/50 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-500 hover:text-white hover:border-transparent"
        }`}
          onClick={createQuiz}
        >
          Create Quiz
        </button>

        <button
          className={`h-[52px] rounded-xl text-xs font-semibold text-center px-3 transition-all duration-300 ease-in-out border cursor-pointer active:scale-95 flex items-center justify-center
        ${
          activeOption === "generateSummary"
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg shadow-purple-500/20"
            : "bg-gray-700/30 text-gray-300 border-gray-600/50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent"
        }`}
          onClick={generateSummary}
        >
          Generate Summary
        </button>

        {/* Spans full width across 2 columns to give it a nice structural anchor */}
        <button
          className={`col-span-2 h-[52px] rounded-xl text-xs font-semibold text-center px-3 transition-all duration-300 ease-in-out border cursor-pointer active:scale-95 flex items-center justify-center
        ${
          activeOption === "explainLikeIm5"
            ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-transparent shadow-lg shadow-emerald-500/20"
            : "bg-gray-700/30 text-gray-300 border-gray-600/50 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-500 hover:text-white hover:border-transparent"
        }`}
          onClick={explainLikeIm5}
        >
          Explain like I'm 5
        </button>
      </div>

      {/* Divider line before content area */}
      <div className="border-b border-gray-700/40 mx-4"></div>

      {/* Content Viewport Section */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar text-sm text-gray-300">
        {activeOption === "createQuiz" && (
          <div className="h-full w-full animate-fadeIn">
            <QuizBox />
          </div>
        )}
        {activeOption === "generateSummary" && (
          <div className="h-full w-full animate-fadeIn">
            <SummaryDisplay
              summary="This is a sample summary."
              type="summary"
            />
          </div>
        )}
        {activeOption === "explainLikeIm5" && (
          <div className="h-full w-full flex flex-col gap-2 animate-fadeIn">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Explanation:
            </h2>
            <p className="text-gray-300 text-xs mb-1">
              Here is an explanation of your file in simple terms:
            </p>
            <SummaryDisplay
              summary="This is a sample explanation."
              type="explanation"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FileOptions