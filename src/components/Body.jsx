import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { addConnections } from "../utils/connectionSlice"; 
import { useEffect } from "react";
import UserNavBar from "./UserNavBar";

const Body = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  // Fetch user data and connections on first load
  useEffect(() => {
    if (!userData) {
      fetchUser();
    } else {
      fetchConnections();
    }
  }, [userData]); // run fetchConnections when userData becomes available

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err?.response?.status === 401) navigate("/login");
      console.error(err);
    }
  };

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data.filter(Boolean))); // filter nulls
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    }
  };

  const shouldHideSidebars = location.pathname === "/profile";

  if (!userData) {
    return (
      <div className="text-white h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <UserNavBar />
      <div className="flex min-h-screen">
        {!shouldHideSidebars && (
          <div className="sticky top-0 h-screen">
            <LeftSidebar user={userData} />
          </div>
        )}

        <div className="flex-grow px-4  bg-gray-950 mt-19  py-2">{children}</div>

        {!shouldHideSidebars && (
          <div className="hidden lg:block sticky top-0 h-screen">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
