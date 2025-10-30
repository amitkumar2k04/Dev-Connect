import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // ✅ Backend now returns a clean list of users
      dispatch(addConnections(res.data.data.filter(Boolean)));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="text-center mt-19 px-4 py-4 bg-gray-900 text-white text-2xl">
        No Connections Found
      </h1>
    );

  return (
    <div className="min-h-screen px-4 sm:px-8 py-6">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        Your Connections
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {connections.map((user) => {
          if (!user) return null;

          const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

          return (
            <div
              key={_id}
              className="bg-[#1F2937] rounded-2xl shadow-lg p-4 flex flex-col items-center text-white hover:scale-105 transition-transform duration-300"
            >
              <img
                src={photoUrl || "/default-avatar.png"}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 mb-4"
              />
              <h2 className="text-lg font-semibold text-center">
                {firstName + " " + lastName}
              </h2>
              {(age || gender) && (
                <p className="text-sm text-gray-400 mt-1">
                  {age ? age : ""}{age && gender ? ", " : ""}{gender ? gender : ""}
                </p>
              )}
              <p className="text-sm text-center text-gray-300 mt-2 whitespace-pre-line">
                {about || "This user hasn't added anything about themselves."}
              </p>

              {/* ✅ Always-visible Message Button */}
              <button
                onClick={() => navigate(`/chat/${_id}`)}
                className="mt-4 w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors"
              >
                Message
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
