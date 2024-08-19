import HomeRight from "./HomeRightbar/HomeRight";
import ProfileRihtbar from "./ProfileRightbar/ProfileRihtbar";
import "./rightbar.css";

const Rightbar = ({ profile }) => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {/* <HomeRight/> */}
        {/* <ProfileRihtbar/> */}
        {profile ? <ProfileRihtbar /> : <HomeRight />}
      </div>
    </div>
  );
};

export default Rightbar;
