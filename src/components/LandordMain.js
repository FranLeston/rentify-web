import React from "react";
import LandlordNav from "./users/Landlordnav";
import { Switch, Route } from "react-router-dom";
import CreateContract from "./users/CreateContract";
import Dashboard from "./users/Dashboard";
import ContractItem from "./users/ContractItem";

const LandordMain = () => {
  return (
    <div className="columns">
      <div className="column is-narrow">
        <LandlordNav />
      </div>
      <Switch>
        <Route exact path="/users/new-contract" component={CreateContract} />
        <Route exact path="/users/edit-contract/:id" component={CreateContract} />
        <Route exact path="/users/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default LandordMain;
