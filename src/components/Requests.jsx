import axios from "axios";
import { BASE_URL } from "../utils/constaints";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      //   console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return <h1 className="flex justify-center py-56">No pending requests</h1>;

  return (
    <div className="text-center pt-8 pb-72">
      <h1 className="text-2xl">Connections Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, about, gender, photoUrl, age } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row justify-evenly items-center gap-x-4 mt-6 rounded-xl p-3 border border-white"
          >
            <div>
              <img
                src={photoUrl}
                alt="Profile Pic"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex flex-col items-start text-center">
              <h2 className="font-bold text-lg w-full md:text-start">
                {firstName + " " + lastName}
              </h2>
              <p>{gender && age && gender + ", " + age}</p>
              <p className="text-gray-300">{about}</p>
            </div>

            <div className="flex flex-row md:flex-col mt-4 gap-x-3 md:gap-4">
            <button
                className="bg-blue-500 px-4 py-2 rounded-xl"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="bg-pink-500 px-4 py-2 rounded-xl"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
