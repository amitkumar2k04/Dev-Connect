import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((store) => store.user);  // getting user from store & passing userData to editprofile
  return (
    userData && (
      <div>
        <EditProfile user={userData} />
      </div>
    )
  );
}

export default Profile;