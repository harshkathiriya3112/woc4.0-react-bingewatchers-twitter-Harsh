import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Component } from "react";
import history from "./history";
import Signin from "./SignIn";
import Signup from "./SignUp";
import Home from "./Home";
import Trending from "./Trending";
import Profile from "./Profile";
import Comment_card from "./Comment_card";
import Personal from "./Personal";
import Edittweet from "./Edittweet";
import Deletetweet from "./Deletetweet";
export default class Routess extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Signin}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/Home" component={Home}></Route>
          <Route path="/Trending" component={Trending}></Route>
          <Route path="/Profile" component={Profile}></Route>
          <Route path="/Comment_card" component={Comment_card}></Route>
          <Route path="/Personal" component={Personal}></Route>
          <Route path="/Edittweet" component={Edittweet}></Route>
          <Route path="/Deletetweet" component={Deletetweet}></Route>
        </Switch>
      </Router>
    );
  }
}
