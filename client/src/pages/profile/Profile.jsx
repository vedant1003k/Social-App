import "./profile.css";
import { useState, useEffect, useContext } from "react";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import Feed from "../../components/feed/Feed";
import axios from "axios";
import { useParams } from "react-router";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { AuthContex } from "../../context/AuthContext";

const Profile = () => {
  const { user: currentUser, dispatch } = useContext(AuthContex);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  const username = useParams().username;
  // console.log(params.username);

  useEffect(() => {
    // console.log("feed render");
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      // console.log(res);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const handleProfileUpload = () => {
    document.getElementById("profileFileInput").click();
    setIsProfileModalOpen(false);
  };

  const handleCoverUpload = () => {
    document.getElementById("coverFileInput").click();
    setIsCoverModalOpen(false);
  };

  const handleProfileRemove = async () => {
    if (user.profilePicture === "") {
      toast.error("Profile picture is Already Removed !");
      return;
    }
    try {
      const res = await axios.put("/users/" + user._id, {
        profilePicture: "",
        userId: user._id,
        password: user.password,
      });
      setUser(res.data.user);
      dispatch({ type: "UPDATE_USER", payload: res.data.user });
      toast.success("Profile picture removed successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Error removing profile picture:", err);
    }
    setIsProfileModalOpen(false);
  };
  const handleCoverRemove = async () => {
    if (user.coverPicture === "") {
      toast.error("Cover picture is Already Removed !");
      return;
    }
    try {
      const res = await axios.put(`/users/${user._id}`, {
        coverPicture: "",
        userId: user._id,
        password: user.password,
      });
      setUser(res.data.user);
      dispatch({ type: "UPDATE_USER", payload: res.data.user });  
      toast.success("Cover picture removed successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Error removing cover picture:", err);
    }
    setIsCoverModalOpen(false);
  };

  const handleFileChange = async (e, isCover = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);

    try {
      await axios.post("/upload", data);
      const updateField = isCover ? "coverPicture" : "profilePicture";
      const res = await axios.put("/users/" + user._id, {
        [updateField]: fileName,
        userId: user._id,
        password: user.password,
      });
      setUser(res.data.user);
      dispatch({ type: "UPDATE_USER", payload: res.data.user });  
      // console.log(res.data.user);
      toast.success("Image Uploaded successfully !");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
                className="profileCoverImg"
                onClick={
                  user._id === currentUser._id
                    ? () => setIsCoverModalOpen(true)
                    : null
                }
              />
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="profileUserImg"
                onClick={
                  user._id === currentUser._id
                    ? () => setIsProfileModalOpen(true)
                    : null
                }
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onUpload={handleProfileUpload}
        onRemove={handleProfileRemove}
        title="Change Profile Photo"
      />
      <Modal
        isOpen={isCoverModalOpen}
        onClose={() => setIsCoverModalOpen(false)}
        onUpload={handleCoverUpload}
        onRemove={handleCoverRemove}
        title="Change Cover Photo"
      />
      <input
        type="file"
        id="profileFileInput"
        style={{ display: "none" }}
        accept=".png,.jpeg,.jpg"
        onChange={(e) => handleFileChange(e)}
      />
      <input
        type="file"
        id="coverFileInput"
        style={{ display: "none" }}
        accept=".png,.jpeg,.jpg"
        onChange={(e) => handleFileChange(e, true)}
      />
    </>
  );
};

export default Profile;
