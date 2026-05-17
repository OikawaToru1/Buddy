

function TabNavigation({setSelectedTab} : any) {
  return (
    <div className="flex gap-8 text-white cursor-pointer">
        <div onClick={() => setSelectedTab('uploadfile')}>Upload Files</div>
        <div onClick={() => setSelectedTab('files')}>List of Files</div>
        <div onClick={() => setSelectedTab('chatbox')}>Chat</div>
    </div>
  )
}

export default TabNavigation