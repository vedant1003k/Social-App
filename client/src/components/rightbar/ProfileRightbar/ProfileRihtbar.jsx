import { Link } from "react-router-dom";
import "./profileRightbar.css";
import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../../context/AuthContext";
import { Add, Remove, MoreVert } from "@material-ui/icons";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProfileRihtbar = ({ user, friends }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContex);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?._id)
  );

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?._id));
  }, [currentUser, user._id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
        // toast.success("UNFOLLOED THE USER");
        toast.success(`UNFOLLOED ${user.username}`);
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        // toast.success("FOLLOWED THE USER");
        toast.success(`FOLLOED ${user.username}`);
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  return (
    <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "UnFollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
      <div className="userInfo">
        <h4 className="rightbarTitle">User information</h4>
        <MoreVert />
      </div>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
            {user?.relationship === "1"
              ? "Single"
              : user?.relationship === "2"
              ? "Couple"
              : "."}
          </span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        {friends.map((friend, index) => (
          <Link
            to={`/profile/` + friend.username}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "inline-block",
            }}
            key={index}
          >
            <div className="rightbarFollowing">
              <img
                src={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProfileRihtbar;
