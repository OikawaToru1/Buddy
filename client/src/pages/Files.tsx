import axios from "axios"
import { useEffect } from "react"

function Files() {
    useEffect(() => {
        axios.get("http://localhost:3000/api/files")
        .then(res => console.log(res))
        .catch(err => console.log(err, "Error fetching files"))
    }, []);
  return (
    <div className="bg-gray-800/50 mx-auto w-2/3 flex flex-col items-center justify-center  py-4 rounded-xl border border-gray-600/50 ">
      List of Files Uploaded Previously !
    </div>
  );
}

export default Files