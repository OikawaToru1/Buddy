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
    axios.post("https://buddy-xe7e.onrender.com/api/users/logout", { withCredentials: true }).then(() => {
      dispatch(logout());
      navigate("/login");
    })
    .catch((err) => {
      console.log("Error logging out: ", err);
    });
  }
  return (
    <nav className="sticky top-0 left-0 w-full h-[72px] flex justify-between items-center lg:px-16 md:px-8 px-6 bg-gray-900/80 backdrop-blur-md  border-gray-800 z-50">
      {/* Modern Logo & Branding */}
      <div className="flex items-center gap-2.5 group cursor-pointer">
        {/* Animated AI/Buddy Spark Icon */}
        <div className="h-9 w-9 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
          <Link to="/">
            <svg
              className="w-5 h-5 text-white animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 21l8.982-11.795H14.19M18 12V4a1 1 0 00-1-1H7a1 1 0 00-1 1v14a1 1 0 001 1h3m4-10h.01M11 8h.01M9 12h.01M13 12h.01"
              />
            </svg>
          </Link>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent tracking-tight">
          <Link to="/">Buddy</Link>
          <span className="text-blue-500 font-black">.</span>
        </h1>
      </div>

      {/* Actions & Navigation Menu */}
      <div className="flex items-center gap-6">
        <ul className="flex items-center gap-4 md:gap-6">
          {/* Create Note Button */}
          <li>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold bg-blue-600/10 text-blue-400 hover:text-white hover:bg-blue-600 border border-blue-500/20 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              <span>Create Note</span>
              <span className="text-sm font-medium">+</span>
            </button>
          </li>

          {/* Profile Avatar / Auth Block */}
          <li className="flex items-center">
            {authState ? (
              <Link
                to="/profile"
                className="flex items-center gap-3 group px-2 py-1 rounded-xl hover:bg-gray-800/40 transition-colors"
              >
                <div className="relative">
                  <img
                    src={
                      userAvatar ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"
                    }
                    alt="Avatar"
                    className="h-9 w-9 rounded-xl object-cover ring-2 ring-gray-700 group-hover:ring-blue-500 transition-all bg-gray-800"
                  />
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-gray-900" />
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-xs font-medium text-gray-200 group-hover:text-blue-400 transition-colors">
                    {authUser}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    View Profile
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                to="/signup"
                className="flex items-center gap-3 group px-2 py-1 rounded-xl hover:bg-gray-800/40 transition-colors"
              >
                {/* Placeholder Styled Gray Circle */}
                <div className="h-9 w-9 bg-gray-800 rounded-xl flex items-center justify-center ring-1 ring-gray-700 group-hover:ring-blue-500/50 transition-all">
                  <svg
                    className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                    Sign In
                  </span>
                </div>
              </Link>
            )}
          </li>

          {/* Logout Action */}
          {authState && (
            <li>
              <button
                onClick={handleLogout}
                className="text-xs font-medium text-gray-400 hover:text-red-400 border border-gray-800 hover:border-red-500/20 px-3 py-2 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Portal Overlay */}
      <Portal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}

export default Header