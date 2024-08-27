import { useEffect, useState } from "react";
import "./message.css";
import { format } from "timeago.js";
import axios from "axios";

const Message = ({ message, own }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUser = async () => {
      try {
        const axiosInstance = axios.create({
          baseURL: process.env.REACT_APP_API_URL,
        });
        const res = await axiosInstance.get("/users?userId=" + message.sender);
        setUser(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [message]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            user?.profilePicture
              ? PF + user.profilePicture
              : PF + "/person/noAvatar.png"
          }
          alt=""
        />
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
