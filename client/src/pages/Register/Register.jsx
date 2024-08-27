import { useRef } from "react";
import "./register.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      !email.current.value ||
      !password.current.value ||
      !username.current.value ||
      !passwordAgain.current.value
    ) {
      toast.error("Every Feild is required");
      return;
    } else if (password.current.value !== passwordAgain.current.value) {
      toast.error("Password's don't match !!");
      return;
    }

    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      await axiosInstance.post("/auth/register", user);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
    // console.log(email.current.value);
  };

  const loginHandler = () => {
    navigate("/login");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ViSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on ViSocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="text"
              className="loginInput"
              placeholder="Username"
              ref={username}
            />
            <input
              type="email"
              className="loginInput"
              placeholder="Email"
              ref={email}
            />
            <input
              type="password"
              minLength={6}
              placeholder="Password"
              className="loginInput"
              ref={password}
              autoComplete="off"
            />
            <input
              autoComplete="off"
              type="password"
              placeholder="Confirm Password"
              className="loginInput"
              ref={passwordAgain}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>

            <button onClick={loginHandler} className="loginRegister">
              Log Into Your Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
