import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import Button from "./Button";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center mt-6">
        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-semibold">
            No Connection Requests Found
          </h1>
          <p className="text-gray-400 mt-2">You're all caught up 🎉</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen px-2 text-white">
      <h1 className="text-3xl font-bold  mb-2 text-center">
        Connection Requests
      </h1>

      <div className="space-y-4 max-w-3xl mx-auto">
        {Array.isArray(requests) &&
          requests
            .filter((request) => request.fromUserId && request.toUserId)
            .map((request) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                request.fromUserId;

              return (
                <div
                  key={_id}
                  className="flex items-center justify-between gap-3 bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={photoUrl || "/default-avatar.png"}
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-600 hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 ml-4">
                    <h2 className="text-xl font-semibold">
                      {firstName} {lastName}
                    </h2>
                    {(age || gender) && (
                      <p className="text-gray-400 text-sm">
                        {age ? age : ""}
                        {age && gender ? ", " : ""}
                        {gender || ""}
                      </p>
                    )}
                    <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                      {about || "No bio provided."}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full bg-gradient-to-r from-gray-500 to-red-700 hover:from-gray-600 hover:to-red-900 text-white font-medium shadow-lg transition duration-300"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Requests;
