import React, { Component } from "react";
import NavBar from "./components/misc/NavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserList from "./components/users/UserList";
import LandlordNav from "./components/users/Landlordnav";
import CreateContract from "./components/users/CreateContract";
import LandordMain from "./components/LandordMain";
import Dashboard from "./components/users/Dashboard";
import ContractItem from "./components/users/ContractItem";




class App extends Component {
  render() {
    return (
      <div className="container is-widescreen has-background-white-ter">
        <NavBar />

        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/users" component={LandordMain} />
          <Route path="/users/dashboard" component={Dashboard} />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}

export default App;
