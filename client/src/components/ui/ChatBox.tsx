import axios from 'axios';
import {  useEffect, useState } from 'react';


function ChatBox(selectedFile : {fileName: string, path: string} | null) {
    const [query, setQuery] = useState("");
    const [convo, setConvo] = useState<{from : string, data : string}[]>([]);
    const [queries, setQueries] = useState<{query: string, response: string}[]>([]);
  const handleSubmit  = () => {
    console.log( "Chat message", query);
    setConvo(prev => [...prev, {from: "You", data: query}]);
    axios.post("http://localhost:3000/api/files/query", {query}, { withCredentials: true })
      .then((res) => {
       
          console.log("Response from server: ", res.data.response);
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
    <div className="w-full md:w-2/3 h-full mr-4 bg-gray-800/50 rounded-xl border border-gray-600/50 flex flex-col justify-between ">
      <div className="border-b border-gray-700 h-[50px]">
        <h1 className="text-lg font-semibold px-4 py-2  text-white">Chat Box : {selectedFile?.fileName || "No file selected"}</h1>
      </div>
      <div className="h-6/7 scroll-auto scrollbar-hide p-2 flex flex-col gap-2 overflow-y-auto">
        { 
          convo && <div>
            {convo.map((item, index) => (
              <div key={index} className={`my-2 mx-4 p-2 rounded-md ${item.from === "You" ? "bg-blue-600 text-white self-end" : "bg-gray-700 text-white self-start"}`}>
                <p>{item.from} : {item.data}</p>
              </div>
            ))}
          </div>
        }
      </div>
      <div className=" h-[50px] w-full flex justify-between gap-4 border py-1 px-2 rounded-lg ring-1 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-2">
        <input className="w-full border-none outline-none overflow-x-auto scroll-auto" type="text" value={query} 
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === "Enter" && query.length>0)
            {
             handleSubmit()
            }
          }}
          />
        <button onClick={handleSubmit} className="bg-blue-600 w-1/6 rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-300 ">Send</button>
      </div>
    </div>
  );
}

export default ChatBox