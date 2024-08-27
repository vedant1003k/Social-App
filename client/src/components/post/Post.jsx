import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContex } from "../../context/AuthContext";

const Post = (props) => {
  const { post } = props;
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setisLiked] = useState(false);
  const [user, setUser] = useState({});
  const [isEditing, setEditing] = useState(false);
  const [desc, setDesc] = useState(post.desc);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(PF);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const { user: currentUser } = useContext(AuthContex);

  useEffect(() => {
    setisLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    // console.log("feed render");
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users/?userId=${post.userId}`);
      // console.log(res);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axiosInstance.put("/post/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (error) {}

    setLike(isLiked ? (prev) => prev - 1 : (prev) => prev + 1);
    setisLiked(!isLiked);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await axiosInstance.put("/post/" + post._id, {
        userId: currentUser._id,
        desc: desc,
      });
      setEditing(false);
      post.desc = desc;
      setDesc(desc);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert
              onClick={post.userId === currentUser._id ? handleEditClick : null}
            />
          </div>
        </div>
        <div className="postCenter">
          {isEditing ? (
            <div className="editBox">
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="postEditInput"
              />
              <div className="editBtns">
                <button onClick={handleSaveClick} className="postSaveButton">
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="postCancelButton"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <span className="postText">{post?.desc}</span>
          )}

          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              alt=""
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCount">{like} people like it </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
