import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/feed");
      }, 900);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col  md:flex-row justify-center  items-start gap-5 ">
        {/* Edit Form */}
        <div className="card rounded-2xl  backdrop-blur-md bg-white/10 border border-white/20 shadow-xl  text-white transition-transform hover:scale-[1.01] duration-300 w-90  max-w-md ">
          <div className="card-body h-138">
            <h2 className="card-title justify-center text-xl">Edit Profile</h2>

            <div className="flex flex-col gap-1">
              {/* First Name */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered  bg-white/5 rounded-lg w-full"
                />
              </label>

              {/* Last Name */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered bg-white/5 rounded-lg w-full"
                />
              </label>

              {/* Photo URL */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered bg-white/5 rounded-lg w-full"
                />
              </label>

              <div className="flex flex-col md:flex-row gap-2">
                {/* Age */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered bg-white/5 rounded-lg w-full"
                  />
                </label>

                {/* Gender */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full bg-zinc-700 text-white rounded-lg"
                  >
                    <option disabled value="">
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </select>
                </label>
              </div>

              {/* About */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea textarea-bordered bg-white/5 rounded-lg w-full"
                  rows={3}
                />
              </label>

              {error && <p className="text-red-500">{error}</p>}

              {/* Save Button */}
              <div className="flex justify-center mt-3">
                <button
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg transition duration-300"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="w-fit max-w-sm">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
            hideActions={true}
          />
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
