import HomeRight from "./HomeRightbar/HomeRight";
import ProfileRihtbar from "./ProfileRightbar/ProfileRihtbar";
import "./rightbar.css";

const Rightbar = ({ user }) => {

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {/* <HomeRight/> */}
        {/* <ProfileRihtbar/> */}
        {user ? <ProfileRihtbar user={user} /> : <HomeRight />}
      </div>
    </div>
  );
};

export default Rightbar;
