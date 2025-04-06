import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constaints";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials : true });
      // console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center pt-8 pb-20">
        <UserCard user={feed[0]} showButtons={true} />
      </div>
    )
  );
};

export default Feed;
