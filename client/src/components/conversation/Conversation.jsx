import { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friends = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const axiosInstance = axios.create({
          baseURL: process.env.REACT_APP_API_URL,
        });
        const res = await axiosInstance.get("/users?userId=" + friends);
        // console.log(res);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (friends) {
      getUser();
    }
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "/person/noAvatar.png"
        }
        className="conversationImg"
        alt=""
      />

      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;
