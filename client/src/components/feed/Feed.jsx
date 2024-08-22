import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../Share/Share";
import "./feed.css";
import axios from "axios";

const Feed = ({ username }) => {
  // const user = Users.filter((u) => u.id === 1);
  // console.log(user);

  const [posts, setPost] = useState([]);

  useEffect(() => {
    // console.log("feed render");
    try {
      const fetchPosts = async () => {
        const res = username
          ? await axios.get("/post/profile/" + username)
          : await axios.get("/post/timeline/66c5a407aeb9c4f33ec3026f");
        // console.log(res);
        setPost(res.data);
      };
      fetchPosts();
    } catch (e) {
      console.log(e);
    }
  }, [username]);

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
