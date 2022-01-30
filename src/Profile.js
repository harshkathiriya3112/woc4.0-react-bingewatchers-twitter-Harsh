import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Navbar from "./Navbar";
import "./Profile.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  increment,
} from "firebase/firestore";
import { FaUserAlt } from "react-icons/fa";
import Home from "./Home";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const [user, setUser] = useState("");

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const logout = async () => {
    await signOut(auth);
  };

  const [userstweet, setUserstweet] = useState([]);

  const [follower_num, setFollower_num] = useState(0);
  const [following_num, setFollowing_num] = useState(0);

  const usersCollectionRef = collection(db, "tweet");
  useEffect(() => {
    const gettweets = async () => {
      if (!user || !user.email) return;
      const q = query(usersCollectionRef, where("mailing", "==", user.email));

      const querySnapshot = await getDocs(q);

      let arr = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        arr.push({ ...doc.data(), id: doc.id });
      });
      console.log(arr);

      setUserstweet(arr);

      let cc = 0,
        cc2 = 0;

      arr.map((tweet) => {
        if (tweet.following_num) {
          cc = 1;
          setFollowing_num(tweet.following_num);
        }
        if (tweet.follower_num) {
          cc2 = 1;
          setFollower_num(tweet.follower_num);
        }
      });

      if (cc == 0) {
        setFollowing_num(0);
      }
      if (cc2 == 0) {
        setFollower_num(0);
      }
    };

    gettweets();
  }, [user]);

  const delete_but =()=>{
    

  }

  return (
    <div>
      <Navbar logout={logout}></Navbar>
      <div className="container">
        <div className="container5">
          <div className="pp button_follow">
            <FaUserAlt className="profile_image"></FaUserAlt>
          </div>
          <div className="pp button_follow">
            <h1>{user ? user.email.split("@")[0] : ""}</h1>
          </div>
          <div className="pp button_follow">
            {/* <button className="button-64" role="button">
              Follow
            </button> */}
          </div>
        </div>
        <div className="container5">
          <h3 className="pp">Tweets:{userstweet.length} </h3>
          <h3 className="pp">Following: {following_num} </h3>
          <h3 className="pp">Followers: {follower_num} </h3>
        </div>
      </div>

      {userstweet.map((tweet) => {
        return (
          <div key={tweet.id} className="container2">
            <h1>{tweet.tweett}</h1>
            <div>
              <button
                className="edit_but"
                onClick={() => {
                  history.push({
                    pathname: "/Edittweet",
                    state: {
                      edit_tweet:tweet.tweett,
                      doc_timee: tweet.doc_timee,
                    },
                  });
                }}
              >
                Edit
              </button>
              <button
                className="delete_but"
                onClick={delete_but}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
