import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import Button from "./Button";

const UserCard = ({ user, hideActions = false }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    // Optimistically remove the user from UI
    dispatch(removeUserFromFeed(userId));
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Failed to send request:", err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="w-90 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl p-4 text-white transition-transform hover:scale-[1.01] duration-300">
      <div className="flex flex-col items-center text-center">
        <img
          src={photoUrl}
          alt="User"
          className="w-32 h-32 object-cover rounded-full border-4 border-white/20 shadow-md mb-4"
        />
        <h2 className="text-2xl font-semibold">{firstName + " " + lastName}</h2>
        {age && gender && (
          <p className="text-sm text-gray-300">{`${age}, ${gender}`}</p>
        )}
        <p className="mt-2 text-sm text-gray-200">{about}</p>

        {!hideActions && (
          <div className="flex gap-4 mt-6">
            <Button
              variant="primary"
              size="sm"
              className="w-full bg-gradient-to-r from-gray-500 to-red-700 hover:from-gray-600 hover:to-red-900 text-white font-medium shadow-lg transition duration-300"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
