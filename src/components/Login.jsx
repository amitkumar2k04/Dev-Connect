import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constaints";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginFrom, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      // console.log(res.data.data);
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center pt-4 pb-12">
        <div className="card bg-neutral w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginFrom ? "Login Here!" : "signUp"}
            </h2>

            {!isLoginFrom && (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="text-red-500">{error}</p>
            <p className="text-red-500"></p>
            <p className="text-right cursor-pointer text-cyan-400 underline">
              Forget Password?
            </p>
            <div className="card-actions justify-center mt-4">
              <button
                className="btn btn-primary"
                onClick={isLoginFrom ? handleLogin : handleSignUp}
              >
                {isLoginFrom ? "Login" : "Sign Up"}
              </button>
            </div>
            <p
              className="m-auto cursor-pointer text-cyan-400 pt-1 underline"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginFrom ? "New User? Signup" : "Existing User? Login"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
