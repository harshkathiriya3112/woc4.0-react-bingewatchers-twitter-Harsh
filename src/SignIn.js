import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLoginBoxLine } from "react-icons/ri";
import "./SignIn.css";
import { Link } from "react-router-dom";
import animate from "./images/88998-website.gif";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Home from "./Home";

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [user, setUser] = useState("");
  // const [hasaccount, sethasAccount] = useState(false);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      history.push("/Home");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(error.message);
          break;
        case "auth/wrong-password":
          setPasswordError(error.message);
      }
      alert("Email or Password error");
      console.log(error.message);
    }
  };

  // onAuthStateChanged(auth, (user) => {
  //   setUser(user);
  // });

  return (
    <div className="bodyy">
      <div className="form">
        <div className="content1">
          <h2 className="heading1">Sign In</h2>
          <BsFillPersonFill className="icon1"></BsFillPersonFill>
          <input
            type="email"
            placeholder="Email"
            className="email"
            required
            value={email}
            onChange={(e) => {
              setLoginEmail(e.target.value);
              setEmail(e.target.value);
            }}
          />
          <br />
          <RiLockPasswordLine className="icon1"></RiLockPasswordLine>
          <input
            type="password"
            placeholder="Password"
            className="password"
            required
            value={password}
            onChange={(e) => {
              setLoginPassword(e.target.value);
              setPassword(e.target.value);
            }}
          />
          <br />
          <RiLoginBoxLine className="icon2"></RiLoginBoxLine>
          {/* {user ? (
            <Link to="/Home">
              <button className="btn1" onClick={login}>
                Log In
              </button>
            </Link>
          ) : ( */}
          <button className="btn1" onClick={login}>
            Log In
          </button>
          {/* )}  */}
          <p className="te1">
            Don't have an account?
            <span> </span>
            <span> </span>
            <Link to="/SignUp">Sign Up</Link>
          </p>
        </div>
      </div>
      <div className="image">
        <img className="animation" src={animate} alt="" />
      </div>
    </div>
  );
};

export default SignIn;
