import React from "react";
import Navbar from "./Navbar";
import { auth } from "./firebase-config";

const Home = () => {
  return (
    <div>
      <Navbar />
      {auth.currentUser.email}
    </div>
  );
};

export default Home;
