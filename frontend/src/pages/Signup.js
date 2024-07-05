import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import React from "react";
import { Link } from "react-router-dom";
import "./Signup.css"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
    // console.log(email, password);
  };
  return (
    <div className="body">
      <section className="container" onSubmit={handleSubmit}>
        <div className="login-container">
          <div className="circle circle-one"></div>
          <div className="form-container">
            <img
              src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration"/>
            <h1 className="opacity">SIGN UP</h1>
            <form>
              <input type="email" placeholder="EMAIL" onChange={(e) => setEmail(e.target.value)} value={email}></input>
              <input placeholder="PASSWORD" type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
              <button className="opacity" disabled={isLoading}>SUBMIT</button>
            </form> 
            <div class="register-forget opacity">
              <Link to="/login"> &lt; BACK </Link> 
            </div>
          </div>         
          <div className="circle circle-two"></div>
          {error && <div className="error">{error}</div>}
        </div>
        <div className="theme-btn-container"></div>
      </section>
    </div>
      
  );
};
export default Signup;



