import React from "react";
import LandlordNav from "./users/Landlordnav";
import { Switch, Route } from "react-router-dom";
import CreateContract from "./users/CreateContract";
import Dashboard from "./users/Dashboard";
import ContractItem from "./users/ContractItem"

const LandordMain = () => {
  return (
   
      <div className="columns">
        <div className="column is-2">
          <LandlordNav />
        </div>
        <Switch>
          <div>
            <Route
              exact
              path="/users/new-contract"
              component={CreateContract}
            />
          </div>
        </Switch>

        <Switch>
        <div>
            <Route exact path="/users/dashboard" component={Dashboard} />
         </div>
        </Switch>
      </div>
   
  );
};

export default LandordMain;
