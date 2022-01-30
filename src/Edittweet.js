import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
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
  orderBy,
} from "firebase/firestore";
import { FaUserAlt } from "react-icons/fa";
import "./Edittweet.css";

const Edittweet = () => {
  const location = useLocation();
  const [user, setUser] = useState("");

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const logout = async () => {
    await signOut(auth);
  };

  const [showtweet, setShowtweet] = useState([]);
  const [edit, setEdit] = useState("");

  const edit_tweet = async () => {
    if (edit == "") {
      alert("Please Enter a tweet");
    } else {
      let docii = location.state.doc_timee;
      console.log(docii);

      const usersCollectionRef = doc(db, "tweet", docii);

      console.log(edit);
      await updateDoc(usersCollectionRef, {
        tweett: edit,
      });

      setEdit(edit);
    }
  };

  useEffect(() => {
    let doci = location.state.doc_timee;

    const usersCollectionRef = collection(db, "tweet");

    if (!user || !user.email) return;
    const q = query(usersCollectionRef, where("doc_timee", "==", doci));

    q = query(usersCollectionRef, orderBy("timestamp", "desc"));

    let arr2 = [];
    const fun = async () => {
      const queryCollection = await getDocs(q);

      queryCollection.forEach((doc) => {
        arr2.push({ ...doc.data(), id: doc.id });
      });

      console.log(arr2);

      let arr3 = [];

      arr2.map((e) => {
        arr3.push({ mail: e.mailing, tweet: e.tweett, time: e.timing });
        setEdit(e.tweett);
      });

      console.log(arr3);
      setShowtweet(arr3);
    };

    fun();
  }, [user]);

  return (
    <div>
      <Navbar logout={logout} />
      <div>
        {showtweet.map((commen) => {
          return (
            <div>
              <div className="container2">
                <div className="container5">
                  <div className="left1">
                    <FaUserAlt className="image_home"></FaUserAlt>
                  </div>
                  <div className="right1">
                    <h2 className="h11">{commen.mail}</h2>
                    <p className="h11 pp">{commen.tweet}</p>
                    <h4 className="h11">{commen.time}</h4>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="container_comment whole">
          <div className="left_input">
            <input
              type="text"
              //   placeholder={location.state.edit_tweet}
              required
              value={edit}
              onChange={(e) => {
                setEdit(e.target.value);
              }}
              className="input_comment"
            ></input>
          </div>
          <div className="right_button">
            {/* <button className="btn4" 
            // onClick={handleSubmit}
            >
              Comment
            </button> */}
            <button className="edit_but btn6" onClick={edit_tweet}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edittweet;
