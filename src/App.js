import React, { Component } from "react";
import NavBar from "./components/misc/NavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserList from "./components/users/UserList";
import LandlordNav from "./components/users/Landlordnav";

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />

        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={LandlordNav} />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}

export default App;