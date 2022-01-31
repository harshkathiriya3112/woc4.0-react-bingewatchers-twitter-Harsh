import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLoginBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./SignIn.css";
import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import animate from "./images/88998-website.gif";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history=useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const[confirmPassword, setConfirmPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // const [user, setUser] = useState({});

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    if (email === "" || password === "") {
      alert("These fields cannot be empty");
    }
    if (password.length < 6) {
      alert("password must contain at least 6 characters");
    }
    if (password.length >= 6) {
      setEmail("");
      setPassword("");
      history.push("/SignIn");
    }
  };

  return (
    <>
      <div className="bodyy">
        <div className="image">
          <img className="animation" src={animate} alt="" />
        </div>
        <div className="form">
          <div className="content1">
            <h2 className="heading1">Sign Up</h2>
            <BsFillPersonFill className="icon1"></BsFillPersonFill>
            <input
              type="email"
              placeholder="Email"
              className="email"
              value={email}
              onChange={(e) => {
                setRegisterEmail(e.target.value);
                setEmail(e.target.value);
              }}
            />
            <br />
            <RiLockPasswordLine className="icon1"></RiLockPasswordLine>
            <input
              type="password"
              placeholder="Confirm Password"
              className="password"
              minlength="6"
              value={password}
              onChange={(e) => {
                setRegisterPassword(e.target.value);
                setPassword(e.target.value);
              }}
            />
            <br />
            <RiLoginBoxLine className="icon2"></RiLoginBoxLine>
            <Link to="/signin"></Link>
            <button
              className="btn1"
              onClick={() => {
                register();
                handleSubmit();
              }}
            >
              Sign Up
            </button>
            <p className="te1">
              Already have an account?
              <span> </span>
              <span> </span>
              <Link to="/SignIn">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
