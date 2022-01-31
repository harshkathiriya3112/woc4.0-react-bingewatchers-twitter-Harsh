import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { useLocation } from "react-router-dom";
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
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { FaUserAlt } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "./Personal.css"

const Personal = (props) => {
  const history = useHistory();

  const location = useLocation();

  const [user, setUser] = useState("");

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  const logout = async () => {
    await signOut(auth);
  };

  const [userstweet, setUserstweet] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [follower_num, setFollower_num] = useState(0);
  const [following_num, setFollowing_num] = useState(0);

  const usersCollectionRef = collection(db, "tweet");
  useEffect(() => {
    const gettweets = async () => {
      if (!user || !user.email) return;

      const q = query(
        usersCollectionRef,
        where("mailing", "==", location.state.mail)
      );

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

      arr.map((e) => {
        if (e.follower_num) {
          setFollower_num(e.follower_num);
          cc = 1;
          console.log(follower_num);
        }
        if (e.following_num) {
          setFollowing_num(e.following_num);
          cc2 = 1;
          console.log(following_num);
        }
      });

      if (cc == 0) {
        setFollower_num(0);
      }

      if (cc2 == 0) {
        setFollowing_num(0);
      }

      let arr3 = [];

      if (arr.follower.length != 0) {
        arr.map((e) => {
          for (let index = 0; index < e.follower.length; index++) {
            arr3.push({
              follower: e.follower[index],
            });
          }
        });
        console.log(arr3);

        setFollowers(arr3);
      }
    };

    gettweets();
  }, [user]);
  const follow = async () => {
    const q3 = query(usersCollectionRef, where("mailing", "==", user?.email));
    const querySnapshot3 = await getDocs(q3);

    let arr3 = [];
    querySnapshot3.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      arr3.push({ ...doc.data(), id: doc.id });
    });
    console.log(arr3);
    if (arr3.length == 0) {
      alert("To follow someone, You should've posted at least one tweet");
    } else {
      let doc_name = "";
      userstweet.map((e) => {
        doc_name = e.doc_timee;
      });

      console.log(doc_name);

      if (!user || !user.email) return;

      const q = query(usersCollectionRef, where("mailing", "==",location.state.mail));

      const querySnapshot = await getDocs(q);

      let arr = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        arr.push({ ...doc.data(), id: doc.id });
      });
      console.log(arr);

      // console.log(userstweet);
      let count1 = 0;

      arr.map((ele) => {
        doc_name = ele.doc_timee;
        console.log(ele.follower_num);
        if (ele.follower_num && ele.follower_num != 0) {
          ele.follower.map((maill) => {
            if (maill == user?.email) {
              count1 = 1;
            }
          });
        }
      });

      console.log(count1);

      if (count1 == 1) {
        alert("You're already following this account");
      } else {
        let docii;
        let temp_arr = [];
        arr.map((commen) => {
          docii = commen.doc_timee;
          temp_arr.push(commen.doc_timee);
        });
        console.log(temp_arr);
        console.log(docii);

        temp_arr.map((doc_name) => {
          setDoc(
            doc(db, "tweet", doc_name),
            {
              follower: arrayUnion(user?.email),
              follower_num: increment(1),
            },
            { merge: true }
          );
        });

        const q2 = query(
          usersCollectionRef,
          where("mailing", "==", user?.email)
        );

        const querySnapshot2 = await getDocs(q2);

        let arr2 = [];
        querySnapshot2.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          arr2.push({ ...doc.data(), id: doc.id });
        });
        console.log(arr2);

        let temp_arr2 = [];
        arr2.map((doc_name) => {
          temp_arr2.push(doc_name.doc_timee);
        });
        console.log(temp_arr2);

        temp_arr2.map((doc_name) => {
          setDoc(
            doc(db, "tweet", doc_name),
            {
              following: arrayUnion(location.state.mail),
              following_num: increment(1),
            },
            { merge: true }
          );
        });
      }
    }
  };

  return (
    <div>
      <Navbar logout={logout} />
      <div className="container23">
        <div className="container5">
          <div className="pp button_follow">
            <FaUserAlt className="profile_image"></FaUserAlt>
          </div>
          <div className="pp button_follow">
            <h1>
              {location.state.mail ? location.state.mail.split("@")[0] : ""}
            </h1>
          </div>
          <div className="pp button_follow">
            <button className="follow_but" role="button" onClick={follow}>
              Follow
            </button>
          </div>
        </div>
        <div className="container5">
          <h3 className="pp">Tweets:{userstweet.length} </h3>
          <h3 className="pp">Following: {following_num} </h3>
          <h3 className="pp">Followers: {follower_num} </h3>
        </div>
      </div>
      {userstweet.map((vari) => {
        return (
          // <div key={tweet.id} className="container2">
          //   <h1>{tweet.tweett}</h1>
          //   <h4 className="h11">{tweet.timing}</h4>
          // </div>
          <div key={vari.id.value} className="container2">
            <div className="container5">
              <div className="left1">
                <FaUserAlt className="image_home"></FaUserAlt>
              </div>
              <div className="right1">
                <h2 className="h11">{vari.mailing}</h2>
                <p className="h11 pp">{vari.tweett}</p>
                <h4 className="h11">{vari.timing}</h4>
              </div>
              <div className="right2">
                {/* <Link to="/Comment_card" > */}
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
                {/* </Link> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Personal;
