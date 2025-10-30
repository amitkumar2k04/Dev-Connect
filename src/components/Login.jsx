import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong...");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover  absolute inset-0 bg-gray-950 opacity-90 bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1601597111158-4b13b0b9f2d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-md">
          {isLoginForm ? "Welcome Back" : "Join Us "}
        </h2>

        {!isLoginForm && (
          <div className="flex flex-col gap-2 mb-2">
            <label className="text-white text-sm">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-white/70"
              placeholder=""
            />
            <label className="text-white text-sm">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-white/70"
              placeholder=""
            />
          </div>
        )}

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-white text-sm">Email Address</label>
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            autoComplete="email"
            placeholder=""
            className="bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-white/70"
          />
          <label className="text-white text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            placeholder=""
            className="bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-white/70"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={isLoginForm ? handleLogin : handleSignUp}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg transition duration-300"
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={() => setIsLoginForm(!isLoginForm)}
          className="mt-4 text-center text-sm text-white hover:underline cursor-pointer transition"
        >
          {isLoginForm
            ? "New here? Create an account"
            : "Already a user? Login here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
