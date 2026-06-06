import UploadFile from "../components/ui/UploadFile"
import Files from "./Files"
import ChatBox from "../components/ui/ChatBox"
import { useState, useEffect } from "react";
import axios from "axios";
import FileOptions from "../components/ui/FileOptions";
// import TabNavigation from "../components/ui/TabNavigation";

// interface tabProps {
//   id : string,
//   label : string,
//   content: any,
// }

function Hero() {
  const [files, setFiles] = useState<{fileName: string, path: string, fileId: string}[]>([]);
  const [selectedFile, setSelectedFile] = useState<{fileName: string, path: string, fileId: string} | null>(null);


  // const tabs : tabProps[]  = [
  //   {
  //     id : 'uploadfile',
  //     label : 'Upload File',
  //     content : <UploadFile/>
  //   },
  //   {
  //     id : 'files',
  //     label : 'Files',
  //     content : <Files/>
  //   },
  //   {
  //     id: 'chatbox',
  //     label : 'Chat box',
  //     content : <ChatBox/>
  //   }
  // ];

  // const TABS = {
  // 'uploadfile' : <UploadFile/>,
  // 'files' : <Files/>,
  // 'chatbox' : <ChatBox/>
  // }
  // const[selectedTab, setSelectedTab] = useState<'uploadfile' | 'files' | 'chatbox'>('uploadfile');

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/files", { withCredentials: true })
      .then((res) => {
        console.log("Files fetched successfully:", res.data.fileHistory);
        res.data.fileHistory?.map((file: any) => {
          setFiles((prevFiles) => [
            ...prevFiles,
            { fileName: file.fileName, path: file.path, fileId: file.fileId },
          ]);
        });
      })
      .catch((err) => console.log(err, "Error fetching files"));
  }, []);


  return (
    <div className="flex flex-col gap-4 items-center md:flex-row   w-full h-[90vh]  text-white">
        <div className="w-full md:w-1/3 h-full bg-gray-800/50 rounded-xl border border-gray-600/50 flex flex-col items-center gap-4">
            <UploadFile />
            <Files files={files} setSelectedFile={setSelectedFile} />
        </div>

      <ChatBox fileName={selectedFile?.fileName || ""} path={selectedFile?.path || ""} fileId={selectedFile?.fileId || ""} />

    <FileOptions fileName={selectedFile?.fileName || ""} path={selectedFile?.path || ""} fileId={selectedFile?.fileId || ""} />
        
    </div>

    // Alternative UI with tab navigation
  //   <div>
  //     <TabNavigation setSelectedTab={setSelectedTab}/>
  //     <div>
  //       {TABS[selectedTab]}
  //     </div>
  //   </div>
  )
}

export default Hero