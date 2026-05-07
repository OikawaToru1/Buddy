import { useState } from "react";
import Portal from "./Portal";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav
      className=" top-0 left-0 w-full h-[70px]  flex justify-between items-center lg:px-16 md:px-8 px-6 py-5 
                    bg-gray-900  border-b border-white/5 text-white"
    >
      <div className=" flex gap-2">
        <span>Logo</span>
        <h1>Buddy</h1>
      </div>
      <div className=" w-2/4 md:w-1/4 h-full flex justify-between">
        <ul className=" flex  w-full h-full justify-around items-center">
          <li
            className="  border rounded-lg px-2 py-1"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Create Note +{" "}
          </li>
          <li className="gap-2">
            <div className="h-10 w-10 bg-white  rounded-full"></div>
            <p className="text-xs text-gray-400 text-center">Profile</p>
          </li>
        </ul>
      </div>
      <Portal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}

export default Header