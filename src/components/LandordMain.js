import React from 'react';
import LandlordNav from './users/Landlordnav';
import { Switch, Route } from 'react-router-dom';
import CreateContract from './users/CreateContract';

const LandordMain = () => {
  return (
    <div>
      <LandlordNav />
      <Switch>
        <Route exact path="/users/new-contract" component={CreateContract} />
      </Switch>
    </div>
  );
};

export default LandordMain;