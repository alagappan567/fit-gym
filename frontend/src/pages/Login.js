import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import React from "react";
import { Link } from "react-router-dom";
import fitlogoIcon from "../assets/fitlogo.png";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    await login(email, password);
  };
  return (
    <div className="body">
      <section className="container" onSubmit={handleSubmit}>
        <div className="welcome">
          <p className="welmsg">welcome to</p>
          <img src={fitlogoIcon} alt="logo" className="welcomelogo"></img>
          <p className="about-msg">
            <span style={{ color: "#E97451", fontWeight: "500" }}>fit</span>
            <span style={{ color: "#2aa9bf", fontWeight: "500" }}>
              Amigo
            </span>{" "}
            is your ultimate companion to calculate calories burned during
            workouts and conveniently save your fitness records for tracking
            progress over time.
          </p>
        </div>
        <div className="login-container">
          <div className="circle circle-one"></div>
          <div className="form-container">
            <img
              src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
              alt="illustration"
              className="illustration"
            />
            <h1 className="opacity">LOG IN</h1>
            <form>
              <input
                className="email-input"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="EMAIL"
              ></input>
              <input
                type="password"
                className="password-input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="PASSWORD"
              ></input>
              <button className="opacity" disabled={isLoading}>
                SUBMIT
              </button>
            </form>
            <div className="register-forget opacity">
              Didn't have an account?{" "}
              <Link to="/signup" className="signin-btn">
                Signup&gt;
              </Link>
            </div>
            {error && <div className="error">{error}</div>}
          </div>
          <div className="circle circle-two"></div>
        </div>
        <div className="theme-btn-container"></div>
      </section>
    </div>
  );
};
export default Login;


