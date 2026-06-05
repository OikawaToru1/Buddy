import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../rtk/store.js";
import {Link} from "react-router"
import Portal from "./Portal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../rtk/slice/authSlice";
import { useNavigate } from "react-router";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authState = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authUser = useSelector((state: RootState) => state.auth.user?.fullName);
  const userAvatar = useSelector((state: RootState) => state.auth.user?.avatar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post("/api/users/logout")
      .then(() => {
        dispatch(logout());
        navigate("/login");
      });
  }
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
            {authState ? (
              <>
                <img src={userAvatar || undefined} alt="Avatar" className="h-10 w-10 bg-white  rounded-full" />
                <p className="text-xs text-gray-400 text-center">
                  <Link to="/profile">{authUser}</Link>
                </p>
              </>
            ) : (
              <>
                <div className="h-10 w-10 bg-white  rounded-full"></div>
                <p className="text-xs text-gray-400 text-center">
                  <Link to="/signup">Profile</Link>
                </p>
              </>
            )}
          </li>
          {authState && <button className="border rounded-lg px-2 py-1" onClick={handleLogout}>Logout</button>}
        </ul>
      </div>
      <Portal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}

export default Header