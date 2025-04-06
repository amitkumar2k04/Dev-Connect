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
          <img src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          {showButtons && (
            <div className="card-actions justify-center my-4">
              <button
                className="btn btn-primary"
                onClick={() => reviewProfile("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewProfile("interested", _id)}
              >
                Send Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
