import React, { Component } from "react";
import { usersService, contractsService } from "../../services";
import { Link, NavLink, withRouter } from "react-router-dom";
import contractService from "../../services/contracts-service";
import DetailedContract from "./DetailedContract";
import { withAuthConsumer } from "../../contexts/AuthStore";

class Properties extends Component {
  state = {
    contracts: []
  };

  componentDidMount() {
    contractService
      .listOwn()
      .then(contracts => this.setState({ contracts: contracts }));
  }

  handleDeleteContract = id => {
    this.setState({
      contracts: this.state.contracts.filter(contract => contract.id !== id)
    });
  };

  render() {
    const contracts = this.state.contracts.map(contract => (
      <DetailedContract key={contract.id} {...contract} />
    ));

    return <div className="column is-offset-1 is-8">{contracts}</div>;
  }
}

export default Properties;
