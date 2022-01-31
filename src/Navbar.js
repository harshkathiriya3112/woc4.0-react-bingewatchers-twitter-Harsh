import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";


function Navbar({logout}) {

  const [user, setUser] = useState("");
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <nav className="bodyy_nav">
      <div className="left">
        <h1 className="binge">Tweettzee</h1>
        <Link to="/Home" className="Link">
          <h2>Home</h2>
        </Link>
        <Link to="/Trending" className="Link">
          <h2>Trending</h2>
        </Link>
        <Link to="/Profile" className="Link">
          <h2>Profile</h2>
        </Link>
      </div>
      <div className="right">
        <Link to="/SignIn">
          <button className="btn2" onClick ={logout}>Sign Out</button>
        </Link>
        {user?.email}
      </div>
    </nav>
  );
}

export default Navbar;
