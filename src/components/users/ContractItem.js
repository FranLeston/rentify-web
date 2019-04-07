import React, { Component } from "react";
import contractService from "../../services/contracts-service";
import { Link } from "react-router-dom";


class ContractItem extends Component {
  handleDelete = id => {
    contractService.deleteContract(id).then(() => this.props.onClickDelete(id));
  };

  render() {
    const { id, address, tenantEmail, rentPrice, endDate } = this.props;

    return (
      <div className="box">
        
          <div className="content" keykey={id}>
            <Link to={`/users/edit-contract/${id}`} className="card-header-icon" aria-label="edit">
              <div className="columns">
              <div className="column is-11">
              <strong>{address}</strong>
              </div>
              <div className="column">
              <span className="icon">
              <i className="fas fa-edit" aria-hidden="true" />
              </span>
              </div>
               </div>
            </Link>
            <small>Rent: €{rentPrice}</small>
            <br />
            <small>Tenant: {tenantEmail}</small>
          </div>
       
      </div>
    );
  }
}

export default ContractItem;
