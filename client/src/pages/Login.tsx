import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import type { RootState } from "../rtk/store.js";
import { loginSuccess } from "../rtk/slice/authSlice";
import { useNavigate , NavLink } from "react-router";
import Loader from "../components/ui/Loader";
import PopOut from "../components/ui/PopOut";


interface LoginProps  {
    password : string;
    email : string;
}

function Login() {
  const [formData, setFormData] = useState<LoginProps>({
    email: '',
    password: '',
  });
  console.log(import.meta.env.VITE_API_URL);
  const authState = useSelector((state: RootState)=> state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPopOut, setShowPopOut] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if(formData.email.trim() === '' || formData.password.trim() === '') {
      setShowPopOut(true);
      setLoading(false);
      return;
    }
    
    axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, formData, {withCredentials : true})
      .then((response) => {
        // console.log("Login successful:", response.data);
        if(response.data && response.data.user){
          dispatch(loginSuccess(
            response.data.user
          ))
        }
        navigate("/home");
        setLoading(false);
        // Handle successful login, e.g., redirect to dashboard
      })
      .catch((error) => {
        console.error("Login failed:", error.response?.data || error.message);
        // Handle login failure, e.g., show error message to user
      })
      .finally(() => {
        setLoading(false);
      });
      
  };

  // const handleLogOut = () => {
  //   axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`, {}, {withCredentials : true})
  //     .then((response) => {
  //       // console.log("Logout successful:", response.data.message);
  //       dispatch(logout());
  //       // Handle successful logout, e.g., redirect to login page
  //     })
  //     .catch((error) => {
  //       console.error("Logout failed:", error.response?.data || error.message);
  //       // Handle logout failure, e.g., show error message to user
  //     });
  // };

    useEffect(() => {
      authState && navigate("/home");

      axios
        .get(`${import.meta.env.VITE_API_URL}/api/users/test`, { withCredentials: true })
        .then((res) => {
          console.log("Test API response:", res.data);
        })
        .catch((err) => {
          console.error("Test API error:", err);
        });
    },[]);
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {showPopOut && (
        <PopOut
          title="Missing Information"
          content="Please fill in all fields."
          onClose={() => setShowPopOut(false)}
        />
      )}
      {loading && <Loader />}
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form className="w-full max-w-sm bg-gray-800/50 rounded-lg p-6" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email" >
            email
          </label>
          <input
            disabled={loading}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            disabled={loading}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*******"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <p className="text-gray-300 flex gap-2 items-center">
            <span> Don't have an account?</span>
            <NavLink to="/signup" className="text-blue-500 hover:text-blue-700">
              Sign Up
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login