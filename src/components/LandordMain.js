import React from "react";
import LandlordNav from "./users/Landlordnav";
import { Switch, Route, Redirect } from "react-router-dom";
import CreateContract from "./users/CreateContract";
import Dashboard from "./users/Dashboard";
import ContractItem from "./users/ContractItem";
import Properties from "./users/Properties";
import MyRent from "./users/MyRent";
import Maintenance from "./users/Maintenance";
import CreateMaintenance from "./users/CreateMaintenance";
import Documents from "./users/Documents";



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
        <Route exact path="/users/properties" component={Properties} />
        <Route exact path="/users/my-rent" component={MyRent} />
        <Route exact path="/users/maintenance" component={CreateMaintenance} />
        <Route exact path="/users/edit-maintenance/:id" component={CreateMaintenance} />
        <Route exact path="/users/documents" component={Documents} />

        <Redirect to="/users/dashboard"/>


      </Switch>
    </div>
  );
};

export default LandordMain;
