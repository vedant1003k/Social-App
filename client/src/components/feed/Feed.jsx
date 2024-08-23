import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../Share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContex } from "../../context/AuthContext";

const Feed = ({ username }) => {
  // const user = Users.filter((u) => u.id === 1);
  // console.log(user);

  const [posts, setPost] = useState([]);
  const { user } = useContext(AuthContex);

  useEffect(() => {
    // console.log("feed render");
    try {
      const fetchPosts = async () => {
        const res = username
          ? await axios.get("/post/profile/" + username)
          : await axios.get("/post/timeline/" + user._id);
        // console.log(res);
        setPost(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      };
      fetchPosts();
    } catch (e) {
      console.log(e);
    }
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
        {/* <Post /> */}
      </div>
    </div>
  );
};

export default Feed;
