import axios from "axios";
import { BASE_URL } from "../utils/constaints";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = (props) => {
  const dispatch = useDispatch();

  const { user, showButtons } = props;

  const reviewProfile = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  //   console.log(user);
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img className="w-full h-60 object-cover rounded-xl border border-gray-700" src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="text-xl text-center font-semibold text-white mt-4">{firstName + " " + lastName}</h2>
          {age && gender && <p className="text-center text-xl text-white mt-4">{age + ", " + gender}</p>}
          <p className="text-gray-400 text-sm mt-1 text-center px-4">{about}</p>
          {showButtons && (
            <div className="card-actions justify-center my-4">
              <button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all duration-300"
                onClick={() => reviewProfile("ignored", _id)}
              >
                Reject
              </button>
              <button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all duration-300"
                onClick={() => reviewProfile("interested", _id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
