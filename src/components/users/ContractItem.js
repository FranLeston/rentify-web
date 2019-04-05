import React, { Component } from 'react'
import contractService from "../../services/contracts-service";

class ContractItem extends Component {

  handleDelete = (id) => {
    contractService.deleteContract(id)
      .then(() => this.props.onClickDelete(id))
  }

  render() {
    const { id, address } = this.props;

    return (
      <li key={id}>
        <span>
          <i>{address}</i>
        
          <small>{id}</small></span>
      </li>
    );
  }
}

export default ContractItem