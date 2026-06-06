
function Files({files,setSelectedFile} : {files: {fileName: string, path: string}[], setSelectedFile: React.Dispatch<React.SetStateAction<{fileName: string, path: string} | null>>}) {


  return (
    <div className="bg-gray-800/50 mx-auto w-2/3 text-center flex flex-col items-center justify-center  py-4 rounded-xl border border-gray-600/50 ">
     {files.length > 0 ? (
        files.map((file, index) => (
          <div key={index} className="bg-gray-700/50 w-full my-2 p-4 rounded-lg border border-gray-600/50"
            onClick={() => setSelectedFile(file)}
            >
            <h2 className="text-xl font-semibold">{file.fileName}</h2>
            <a href={file.path} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              View File
            </a>
          </div>
        ))
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
}

export default Files