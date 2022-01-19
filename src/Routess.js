import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Component } from "react";
import history from "./history";
import Signin from "./SignIn";
import Signup from "./SignUp";
import Home from "./Home";
export default class Routess extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Signin}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/Home" component={Home}></Route>
        </Switch>
      </Router>
    );
  }
}
