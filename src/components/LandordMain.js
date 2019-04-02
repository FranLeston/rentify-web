import React from "react";
import LandlordNav from "./users/Landlordnav";
import { Switch, Route } from "react-router-dom";
import CreateContract from "./users/CreateContract";

const LandordMain = () => {
  return (
    <div className="block">
      <div className="columns">
        <div className="column is-3">
          <LandlordNav />
        </div>
        <Switch>
          <div className="column">
            <Route
              exact
              path="/users/new-contract"
              component={CreateContract}
            />
          </div>
        </Switch>
      </div>
    </div>
  );
};

export default LandordMain;
