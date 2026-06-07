export default function Loader(){
    return (
      <div className="absolute bg-black/50 text-white p-4 rounded-lg h-25 w-50 flex items-center justify-center gap-4">
        <div className="spinner w-6 h-6  border-4 border-t-blue-500 rounded-full animate-spin "></div>
        <p className="text-center text-lg">Loading...</p>
      </div>
    );
}