import axios from 'axios';
import {  useEffect, useState } from 'react';


function ChatBox(selectedFile : {fileName: string, path: string, fileId: string} | null) {
    const [query, setQuery] = useState("");
    const [convo, setConvo] = useState<{from : string, data : string}[]>([]);
    const [queries, setQueries] = useState<{query: string, response: string}[]>([]);
  const handleSubmit  = () => {
    setConvo(prev => [...prev, {from: "You", data: query}]);
    axios.post("http://localhost:3000/api/files/query", {query, fileId: selectedFile?.fileId || "" , fileName : selectedFile?.fileName || "", path : selectedFile?.path || "", conversationContext: convo}, { withCredentials: true })
      .then((res) => {
       
          setConvo(prev => [...prev, {from: "Buddy", data: res.data.response}]);

      })
      .catch((err) => {
        console.log(err, "Error sending query");
      });
    setQuery("");
  }

   useEffect(() => {
    
   }, []);

  return (
    <div className="w-full md:w-2/3 h-full mr-4 bg-gray-800/50 rounded-xl border border-gray-600/50 flex flex-col justify-between shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="border-b border-gray-700/60 h-[56px] flex items-center px-4 shrink-0">
        <h1 className="text-sm font-semibold text-gray-200 flex items-center gap-2 truncate">
         
          Chat Box:{" "}
          <span className="text-blue-400 font-medium truncate">
            {selectedFile?.fileName || "No file selected"}
          </span>
        </h1>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 flex flex-col overflow-y-auto space-y-4 custom-scrollbar">
        {convo && (
          <div className="flex flex-col space-y-3">
            {convo.map((item, index) => {
              const isYou = item.from === "You";
              return (
                <div
                  key={index}
                  className={`flex flex-col max-w-[80%] ${isYou ? "self-end items-end" : "self-start items-start"}`}
                >
                  {/* Optional tiny sender name tag */}
                  <span className="text-[10px] text-gray-400 mb-1 px-1">
                    {item.from}
                  </span>

                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm break-words
                  ${
                    isYou
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-gray-700/60 text-gray-100 border border-gray-600/30 rounded-tl-none"
                  }`}
                  >
                    <p>{item.data}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Input Footer Area */}
      <div className="p-3 bg-gray-800/40 border-t border-gray-700/50 shrink-0">
        <div className="w-full flex items-center gap-2 bg-gray-900/40 border border-gray-600/50 rounded-xl p-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <input
            className="w-full bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-500 px-3 py-1.5 scrollbar-none"
            type="text"
            placeholder="Ask something about this file..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.length > 0) {
                handleSubmit();
              }
            }}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-500 active:scale-95 transition-all shrink-0 shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox