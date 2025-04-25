import axios from "axios";
import { BASE_URL } from "../utils/constaints";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  // console.log(connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="flex justify-center py-56">No Connections Found</h1>;

  return (
    <div className="text-center pt-8 pb-72">
      <h1 className="text-2xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, about, gender, photoUrl, age } =
          connection;

        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row gap-x-4 mt-6 rounded-xl p-3 border border-white items-center sm:items-start"
          >
            <div className="border-2 border-purple-400 rounded-full overflow-hidden w-[80px] h-[80px]">
              <img
                src={photoUrl}
                alt="Profile Pic"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start text-center">
              <h2 className="font-bold text-lg">
                {firstName + " " + lastName}
              </h2>
              <p className="font-semibold text-gray-400">{gender && age && gender + ", " + age}</p>
              <p className="text-gray-300">{about}</p>
            </div>
            <Link to={"/chat/" + _id}>
            <button className="text-white font-bold bg-blue-400 rounded-lg px-4 py-2">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
