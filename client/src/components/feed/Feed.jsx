import Post from "../post/Post";
import Share from "../Share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";

const Feed = () => {

  // const user = Users.filter((u) => u.id === 1);
  // console.log(user);
  

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
        {/* <Post /> */}
      </div>
    </div>
  );
};

export default Feed;
