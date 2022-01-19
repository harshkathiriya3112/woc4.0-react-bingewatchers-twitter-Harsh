import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="bodyy_nav">
      <div className="left">
        <h1 className="binge">BingeWatcher</h1>
        <Link to="/Home" className="Link">
          <h3>Home</h3>
        </Link>
        <Link to="/Trending" className="Link">
          <h3>Trending</h3>
        </Link>
        <Link to="/Profile" className="Link">
          <h3>Profile</h3>
        </Link>
      </div>
      <div className="right">
        <Link to="/SignIn">
          <button className="btn2">Sign Out</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
