import UploadFile from "../components/ui/UploadFile"
import Files from "./Files"


function Hero() {
  return (
    <div className="flex flex-col gap-4 items-center md:flex-row   w-full h-[90vh]  text-white">
        <div className="w-full md:w-1/3 h-full bg-gray-800/50 rounded-xl border border-gray-600/50 flex flex-col items-center gap-4">
            <UploadFile />
            <Files />
        </div>

        <div className="w-full md:w-2/3 h-full bg-gray-800/50 rounded-xl border border-gray-600/50 flex items-center justify-center">
            <h1>View and chat with Ai</h1>
        </div>
    </div>
  )
}

export default Hero