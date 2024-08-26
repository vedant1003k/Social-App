import { useContext } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import "./messenger.css";
import { AuthContex } from './../../context/AuthContext';

const Messenger = () => {

  const {user} = useContext(AuthContex);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input type="text" placeholder="Search for a friend" className="chatMenuInput" />
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
              <Message/>
              <Message own={true}/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
          </div>
          <div className="chatBoxBottom">
            <textarea className="chatMessageInput" name="" placeholder="write Somthing" id=""></textarea>
            <button className="chatSubmitButton">Send</button>
          </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline/>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
