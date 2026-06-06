
function Files({files,setSelectedFile} : {files: {fileName: string, path: string, fileId: string}[], setSelectedFile: React.Dispatch<React.SetStateAction<{fileName: string, path: string, fileId: string} | null>>}) {


  return (
    <div className="bg-gray-800/50 mx-auto w-2/3 flex flex-col rounded-xl border border-gray-600/50 max-h-[400px]">
      {files.length > 0 ? (
        /* Scrollable wrapper for the items */
        <div className="overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-gray-700/30 hover:bg-gray-700/60 transition-colors duration-200 w-full p-4 rounded-lg border border-gray-600/50 flex items-center justify-between cursor-pointer"
              onClick={() => setSelectedFile(file)}
            >
              <div className="flex flex-col items-start truncate mr-4">
                <h2 className="text-sm font-medium text-gray-200 truncate max-w-xs sm:max-w-md">
                  {file.fileName}
                </h2>
              </div>
              <a
                href={file.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-md transition-colors shrink-0"
                onClick={(e) => e.stopPropagation()} // Prevents triggering setSelectedFile when clicking the link
              >
                View File
              </a>
            </div>
          ))}
        </div>
      ) : (
        /* Centered empty state */
        <div className="text-center py-8 text-gray-400 flex flex-col items-center justify-center">
          <p className="text-sm">No files uploaded yet.</p>
        </div>
      )}
    </div>
  );
}

export default Files