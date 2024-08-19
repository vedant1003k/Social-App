import "./online.css";

const Online = ({user}) => {
  return (
    <li className="rightbarFriend">
      <div className="rightbarImgContainer">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={user.profilePicture}
            alt=""
          />
          <span className="rightbarOnline"> </span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </div>
    </li>
  );
};

export default Online;
