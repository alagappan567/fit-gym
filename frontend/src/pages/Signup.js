import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import React from "react";
import { Link } from "react-router-dom";
import fitlogoIcon from "../assets/fitlogo.png";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, email, password);
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
            <h1 className="opacity">SIGN UP</h1>
            <form>
              <input
                type="text"
                placeholder="USERNAME"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              ></input>
              <input
                type="email"
                placeholder="EMAIL"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
              <input
                placeholder="PASSWORD"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
              <button className="opacity" disabled={isLoading}>
                SUBMIT
              </button>
            </form>
            <div className="register-forget opacity">
              <Link to="/login" className="signin-btn" id="back"> &lt; BACK </Link>
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
export default Signup;
