import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constaints";

const Login = () => {
  const [emailId, setEmailId] = useState("amitkumar2k00@gmail.com");
  const [password, setPassword] = useState("Amit@123");
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
      //console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="flex justify-center pt-4 pb-12">
        <div className="card bg-neutral w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Login Here!</h2>
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
            <p className="text-red-500"></p>
            <p className="text-right cursor-pointer text-cyan-400 underline">
              Forget Password?
            </p>
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
            <p className="m-auto cursor-pointer text-cyan-400 pt-1 underline">
              New User? Signup
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
