import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import "./Home.css";
import "./Comment_card.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  setDoc,
  arrayUnion,
  query,
  where,
  increment
} from "firebase/firestore";

const Comment_card = (props) => {
  const [user, setUser] = useState("");

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const logout = async () => {
    await signOut(auth);
  };

  const location = useLocation();
  const [comment, setComment] = useState([]);
  const [show_comment, setShowComment] = useState([]);
  const [one_comment, setOneComment] = useState([]);

  // const usersCollectionRef = collection(db, "tweet");

  let doci;
  let arr2 = [];
  const [add_comment, setAdd_comment] = useState("");

  useEffect(() => {
    console.log(location.state.time);
    doci = location.state.time;
    let arr = [];
    arr.push({
      mail: location.state.mail,
      tweet: location.state.tweet,
      time: location.state.time,
      doc_timee: location.state.doc_timee,
    });
    console.log(arr);
    setComment(arr);
    // console.log(comment);

    const usersCollectionRef = collection(db, "tweet");
    if (!user || !user.email) return;
    
    const q = query(usersCollectionRef, where("timing", "==", doci));

    const showll = async () => {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        arr2.push({ ...doc.data(), id: doc.id });
      });
      console.log(arr2);
      setShowComment(arr2);
      console.log(show_comment);
      let arr3 = [];
      arr2.map((e) => {
        for (let index = 0; index < e.commentors.length; index++) {
          arr3.push({
            commentor: e.commentors[index],
            comment: e.comments[index],
          });
        }
      });

      console.log(arr3);
      setOneComment(arr3);
    };
    showll();
  }, [add_comment]);


  // console.log(comment.doc_time);
  const handleSubmit = async () => {
    if (add_comment === "") {
      alert("Please enter a comment");
    } else {
      var count1 = 1;
      console.log(count1);
      // console.log(arr2);
      console.log(show_comment);

      let arr2=[];

      const usersCollectionRef = collection(db, "tweet");
      if (!user || !user.email) return;

      const q = query(
        usersCollectionRef,
        where("timing", "==", location.state.time)
      );
      
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        arr2.push({ ...doc.data(), id: doc.id });
      });
      console.log(arr2);


      arr2.map((e) => {
        console.log(e.commentors);
        if (e.commentors && e.commentors.length != 0) {
          e.commentors.map((commentor) => {
            console.log(commentor);
            if (commentor === user?.email) {
              count1 = 0;
            }
          });
        }
      });

      console.log(count1);
      if (count1 == 1) {
        let docii;
        comment.map((commen) => {
          docii = commen.doc_timee;
        });
        console.log(docii);
        await setDoc(
          doc(db, "tweet", docii),
          {
            commentors: arrayUnion(user?.email),
            comments: arrayUnion(add_comment),
            comment_num:increment(1)
          },
          { merge: true }
        );
        setAdd_comment("");
      } else {
        alert("You have already commented on this tweet");
      }
    }
  };

  return (
    <div>
      <Navbar logout={logout} />
      <div>
        {comment.map((commen) => {
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
                    {/* {doci=commen.doc_time} */}
                    {/* {console.log(doci)} */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {one_comment.map((commen) => {
          return (
            <div>
              <div className="container2 ">
                <div className="container5">
                  <div className="left1">
                    <FaUserAlt className="image_home"></FaUserAlt>
                  </div>
                  <div className="right1">
                    <h2 className="h11">{commen.commentor}</h2>
                    <p className="h11 pp">{commen.comment}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* <button onClick={showme}>Show all comments</button> */}

        <div className="container_comment whole">
          <div className="left_input">
            <input
              type="text"
              placeholder="Add a Comment"
              required
              value={add_comment}
              onChange={(e) => {
                setAdd_comment(e.target.value);
              }}
              className="input_comment"
            ></input>
          </div>
          <div className="right_button">
            <button className="btn4" onClick={handleSubmit}>
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment_card;
