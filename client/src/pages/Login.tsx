import { useState } from "react";
import axios from "axios";

interface LoginProps  {
    password : string;
    username : string;
}

function Login() {
  const [formData, setFormData] = useState<LoginProps>({
    username: '',
    password: '',
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("/api/auth/login", formData, {withCredentials : true})
      .then((response) => {
        console.log("Login successful:", response.data);
        // Handle successful login, e.g., redirect to dashboard
      })
      .catch((error) => {
        console.error("Login failed:", error.response?.data || error.message);
        // Handle login failure, e.g., show error message to user
      });
  };

  const handleLogOut = () => {
    axios.post("/api/auth/logout", {}, {withCredentials : true})
      .then((response) => {
        console.log("Logout successful:", response.data);
        // Handle successful logout, e.g., redirect to login page
      })
      .catch((error) => {
        console.error("Logout failed:", error.response?.data || error.message);
        // Handle logout failure, e.g., show error message to user
      });
  }
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form className="w-full max-w-sm bg-gray-800/50 rounded-lg p-6" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
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
            <a href="/signup" className="text-blue-500 hover:text-blue-700">
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login