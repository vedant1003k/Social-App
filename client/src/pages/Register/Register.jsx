import "./register.css";

const Register = () => {
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
          <div className="loginBox">
            <input type="text" className="loginInput" placeholder="Username" />
            <input type="email" className="loginInput" placeholder="Email" />
            <input placeholder="Password" className="loginInput" />
            <input placeholder="Confirm Password" className="loginInput" />
            <button className="loginButton">Sign Up</button>
            {/* <span className="loginForgot">Forgot Password?</span> */}
            <button className="loginRegister">Log Into Your Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
