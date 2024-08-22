import "./profileRightbar.css";

const ProfileRihtbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <h4 className="rightbarTitle">User information</h4>
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
            {user.relationship === 1
              ? "Single"
              : user.relationship === 2
              ? "Couple"
              : "."}
          </span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img
            src={`${PF}person/1.jpeg`}
            alt=""
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
          <img
            src={`${PF}person/2.jpeg`}
            alt=""
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
          <img
            src={`${PF}person/3.jpeg`}
            alt=""
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">Dextor jakson</span>
        </div>
        <div className="rightbarFollowing">
          <img
            src={`${PF}person/4.jpeg`}
            alt=""
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">Sean Jhon </span>
        </div>
        <div className="rightbarFollowing">
          <img
            src={`${PF}person/5.jpeg`}
            alt=""
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">Sarina</span>
        </div>
        <div className="rightbarFollowing">
          <img
            src={`${PF}person/6.jpeg`}
            alt=""
            className="rightbarFollowingImg"
          />
          <span className="rightbarFollowingName">Eillie Carry</span>
        </div>
      </div>
    </>
  );
};

export default ProfileRihtbar;
