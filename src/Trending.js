import React, { useState, useEffect } from "react";
import "./Trending.css";
import Navbar from "./Navbar"

const Trending = () => {
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=0cf7ae91ef6eec8132ac4472ec81c25d"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let harshh = data.results;
        console.log(harshh);

        setUsers(harshh);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar/>
      <div>
        <div>
          {users.map((data) => (
            <div key={data.id.value} className="container">
              <h1 className="trend_title"> {data.title}</h1>
              <h4>{data.overview}</h4>
              <h4 className="trend_date">{data.release_date}</h4>
              <h4 className="trend_rate">RATING:{data.vote_average}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;
