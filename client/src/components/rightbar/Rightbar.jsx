import { useEffect, useState } from "react";
import HomeRight from "./HomeRightbar/HomeRight";
import ProfileRihtbar from "./ProfileRightbar/ProfileRihtbar";
import "./rightbar.css";
import axios from "axios";

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      if (user?._id) {
        try {
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getFriends();
  }, [user]);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {/* <HomeRight/> */}
        {/* <ProfileRihtbar/> */}
        {user ? (
          <ProfileRihtbar user={user} friends={friends} />
        ) : (
          <HomeRight />
        )}
      </div>
    </div>
  );
};

export default Rightbar;
