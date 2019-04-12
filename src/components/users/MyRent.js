import React, { Fragment, Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { withAuthConsumer } from "../../contexts/AuthStore";
import { authService } from "../../services";
import contractService from "../../services/contracts-service";
import { usersService } from '../../services';
import UserItem from './UserItem';
import PayRent from "./PayRent";


class MyRent extends Component {
  state = {
    contracts: []
  };

  componentDidMount() {
    contractService
      .getTenantContract()
      .then(contracts => this.setState({ contracts: contracts }));
    
  }
  
  render() {
    const contracts = this.state.contracts.map(contract => (
      <PayRent key={contract.id} {...contract} />
      ));




    return (
      <section className="section">
        <div className="container">
        {contracts}
      </div>
      </section>
    );
  }
}

export default withRouter(withAuthConsumer(MyRent));
