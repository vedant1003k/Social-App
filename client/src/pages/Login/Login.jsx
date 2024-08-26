import { useContext, useRef } from "react";
import "./login.css";
import toast from "react-hot-toast";
import { loginCall } from "../../apiCalls";
import { AuthContex } from "./../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const { isFetching, dispatch } = useContext(AuthContex);

  const handleClick = (e) => {
    e.preventDefault();
    if (!email.current.value || !password.current.value) {
      toast.error("Email & Password is required");
      return;
    }
    // console.log(email.current.value);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const registerHandler = () => {
    navigate("/register");
  };

  // console.log(user);

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
              type="email"
              className="loginInput"
              placeholder="Email"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              autoComplete="off"
              ref={password}
              minLength={6}
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress size="20px" className="loading" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegister"
              disabled={isFetching}
              onClick={registerHandler}
            >
              {isFetching ? (
                <CircularProgress size="20px" className="loading" />
              ) : (
                "Create a new Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
