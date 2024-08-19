import "./homeRight.css"
import {Users} from '../../../dummyData'
import Online from "../../Online/Online";

const HomeRight = () => {
  return (
    <>
      <div className="birthdayContainer">
        <img src="/assets/gift.png" className="birthdayImg" alt="" />
        <span className="birthdayText">
          <strong>Shreya Maurya</strong> and <strong>3 other friend</strong>{" "}
          have a birthday today
        </span>
      </div>
      <img className="rigthbarAd" src="/assets/ad.png" alt="" />
      <h4 className="rightbarTitle">Online Friends</h4>
      <ul className="rightbarFriendList">
        {Users.map((u) => (
          <Online user={u} key={u.id} />
        ))}
      </ul>
    </>
  );
};

export default HomeRight;
