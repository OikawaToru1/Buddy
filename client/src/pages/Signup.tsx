import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Loader from "../components/ui/Loader";
import PopOut from "../components/ui/PopOut";

interface SignUpProps {
    fullName : string;
    username: string;
    email: string;
    password: string;
    avatar?: File;
}

function Signup() {
    const [formData, setFormData] = useState<SignUpProps>({
        fullName : '',
        username: '',
        email: '',
        password: '',
        avatar: undefined,
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [showPopOut, setShowPopOut] = useState<boolean>(false);
    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("Form data on submit: ", formData);
        if(formData.email.trim() === '' || formData.password.trim() === '' || formData.username.trim() === '' || formData.fullName.trim() === '' || !formData.avatar) {
          setShowPopOut(true);
          return;
        }
        setLoading(true);
        if(formData.username && formData.email && formData.password) {
            const data = new FormData();
            data.append("fullName", formData.fullName);
            data.append("username", formData.username);
            data.append("email", formData.email);
            data.append("password", formData.password);
            if(formData.avatar) {
              data.append("avatar", formData.avatar);
            }
            axios.post("/api/users/register", data, {withCredentials : true})
              .then((response) => {
                // console.log("Sign up successful:", response.data);
                navigate("/login");
                setLoading(false);
                // Handle successful sign up, e.g., redirect to login page
              })
              .catch((error) => {
                console.error("Sign up failed:", error.response?.data || error.message);
                // Handle sign up failure, e.g., show error message to user
              })
              .finally(() => {
                setLoading(false);
                setFormData({
                  fullName: "",
                  username: "",
                  email: "",
                  password: "",
                  avatar: undefined,
                });
              });

        } else {
          console.warn("Please fill in all fields.");
            alert("Please fill in all fields.");
        }
        // Here you would typically send the data to your backend API
    }
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
        <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
        <form
          className="w-full max-w-sm bg-gray-800/50 rounded-lg p-6"
          onSubmit={handleSignUp}
        >
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="john doe"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="mb-6 flex gap-4 items-center">
            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="text-gray-300  bg-gray-700 hover:bg-gray-600 focus:outline-none focus:shadow-outline rounded w-full py-2 px-3"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData({ ...formData, avatar: file });
                }
              }}
            />
          </div>

          <div className="flex flex-col gap-4 items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>

            <p className="text-gray-300 flex gap-2 items-center">
              <span> Already have an account?</span>
              <a href="/login" className="text-blue-500 hover:text-blue-700">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    );
}

export default Signup;  