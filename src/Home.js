import React, { useState, useEffect, Component } from "react";
import Navbar from "./Navbar";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  setDoc,
  arrayUnion,
  increment,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import "./Home.css";
import { FaUserAlt } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";

const Home = () => {
  const history = useHistory();
  const [user, setUser] = useState("");

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const logout = async () => {
    await signOut(auth);
  };

  const [newTweet, setNewTweet] = useState("");
  const [tweet, setTweet] = useState([]);

  let varii;
  varii = user?.email + new Date();

  const usersCollectionRef = collection(db, "tweet");
  const createTweet = async () => {
    if (newTweet === "") {
      alert("This field cannot be empty");
    } else {
      await setDoc(
        doc(db, "tweet", varii),
        {
          mailing: user?.email,
          timing: new Date().toLocaleString() + "",
          tweett: newTweet,
          doc_timee: varii,
          liked_num: 0,
          comment_num: 0,
          timestamp: serverTimestamp(),
          css: "like_icon",
        },
        { merge: true }
      );
    }
  };

  const handleSubmit = async (e) => {
    setNewTweet("");
  };

  useEffect(() => {
    const gettweets = async () => {
      const q = query(usersCollectionRef, orderBy("timestamp", "desc"));
      const data = await getDocs(q);
      console.log(data);

      let arr = [];
      data.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      console.log(arr);

      arr.map((e) => {
        if (e.liked_num != 0) {
          e.liked_by.map((liked) => {
            if (liked == user?.email) {
              e.css = "liked_but";
            }
          });
        }
      });
      console.log(arr);
      // setTweet(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setTweet(arr);
    };

    gettweets();
  }, [newTweet]);

  const like = async (twett,likes) => {



    

    if (!user || !user.email) return;

    const q = query(usersCollectionRef, where("tweett", "==", twett));

    const querySnapshot = await getDocs(q);

    let arr = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      arr.push({ ...doc.data(), id: doc.id });
    });
    console.log(arr);

    var count1 = 0;
    let doc_name = "";
    console.log(count1);
    arr.map((ele) => {
      doc_name = ele.doc_timee;
      console.log(ele.liked_num);
      if (ele.liked_num != 0) {
        ele.liked_by.map((maill) => {
          if (maill == user?.email) {
            count1 = 1;
          }
        });
      }
    });
    console.log(count1);
    console.log(doc_name);
    if (count1 == 0) {
      await setDoc(
        doc(db, "tweet", doc_name),
        {
          liked_by: arrayUnion(user?.email),
          liked_num: increment(1),
        },
        { merge: true }
      );
      
    } else {
      alert("You have already liked this tweet");
    }
  };

  return (
    <div>
      <Navbar logout={logout} />
      {/* {tweet.length} */}

      <div className="container2 whole">
        <div className="left_image">
          {/* <img src="/" alt="/"></img> */}
          <FaUserAlt className="image_home"></FaUserAlt>
        </div>
        <div className="right_cont">
          <input
            placeholder="What's happening? "
            className="tweet-input"
            // className="right_cont"
            value={newTweet}
            onChange={(e) => {
              setNewTweet(e.target.value);
            }}
          ></input>

          <div>Tweet as {user?.email}</div>

          <button
            onClick={() => {
              createTweet();
              handleSubmit();
            }}
            className="btn3"
          >
            Tweet
          </button>
        </div>
      </div>

      {tweet.map((vari) => {
        return (
          <div key={vari.id.value} className="container2">
            <div className="container5">
              <div className="left1">
                <FaUserAlt className="image_home"></FaUserAlt>
              </div>
              <div className="right1">
                <h2
                  className="h11 underline"
                  onClick={() => {
                    if (vari.mailing == user?.email) {
                      history.push({
                        pathname: "/Profile",
                      });
                    } else {
                      history.push({
                        pathname: "/Personal",
                        state: {
                          mail: vari.mailing,
                        },
                      });
                    }
                  }}
                >
                  {"@" + vari.mailing.split("@")[0]}
                </h2>
                <p className="h11 pp">{vari.tweett}</p>
                <h4 className="h11">{vari.timing}</h4>
              </div>
              <div className="right2">
                {/* <Link to="/Comment_card" > */}
                <AiOutlineLike
                  className={vari.css}
                  onClick={() => like(vari.tweett,vari.liked_num)}
                ></AiOutlineLike>
                <div className="like_num">{vari.liked_num}</div>
                <FaRegComment
                  className="comment_icon "
                  onClick={() => {
                    history.push({
                      pathname: "/Comment_card",
                      state: {
                        mail: vari.mailing,
                        tweet: vari.tweett,
                        time: vari.timing,
                        doc_timee: vari.doc_timee,
                      },
                    });
                  }}
                ></FaRegComment>
                <div className="comment_num">{vari.comment_num}</div>
                {/* </Link> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
