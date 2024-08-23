import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import "./share.css";
import { useContext, useRef, useState } from "react";
import { AuthContex } from "./../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const Share = () => {
  const { user } = useContext(AuthContex);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();

  const [file, setFile] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong !!");
      }
    } else {
      toast.error("Upload the File !!");
      return;
    }
    try {
      await axios.post("/post", newPost);
      toast.success("Post Shared !!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong !!");
    }
    // console.log("working");
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            type="text"
            placeholder={"what's in your mind " + user.username + " ?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelngs</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
