import UploadFile from "../components/ui/UploadFile"
import Files from "./Files"
import ChatBox from "../components/ui/ChatBox"
import { useState } from "react";
import FileOptions from "../components/ui/FileOptions";
import TabNavigation from "../components/ui/TabNavigation";

interface tabProps {
  id : string,
  label : string,
  content: any,
}

function Hero() {

  const tabs : tabProps[]  = [
    {
      id : 'uploadfile',
      label : 'Upload File',
      content : <UploadFile/>
    },
    {
      id : 'files',
      label : 'Files',
      content : <Files/>
    },
    {
      id: 'chatbox',
      label : 'Chat box',
      content : <ChatBox/>
    }
  ];

  const TABS = {
  'uploadfile' : <UploadFile/>,
  'files' : <Files/>,
  'chatbox' : <ChatBox/>
  }
  const[selectedTab, setSelectedTab] = useState<'uploadfile' | 'files' | 'chatbox'>('uploadfile');

  return (
    <div className="flex flex-col gap-4 items-center md:flex-row   w-full h-[90vh]  text-white">
        <div className="w-full md:w-1/3 h-full bg-gray-800/50 rounded-xl border border-gray-600/50 flex flex-col items-center gap-4">
            <UploadFile />
            <Files />
        </div>

      <ChatBox/>
    <FileOptions/>
        
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