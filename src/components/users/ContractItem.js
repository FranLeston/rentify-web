import React, { Component } from "react";
import contractService from "../../services/contracts-service";
import { Link } from "react-router-dom";

class ContractItem extends Component {
  handleDelete = id => {
    contractService.deleteContract(id).then(() => this.props.onClickDelete(id));
  };

  render() {
    const { id, address, deposit, rentPrice, endDate } = this.props;

    return (
      <div className="box" keykey={id}>
       
          <article class="message is-info">
            <div class="message-header">
              <Link to={`/users/edit-contract/${id}`}>{address}</Link>
              <Link to={`/users/edit-contract/${id}`}>
                <span className="icon is-right">
                  <i className="fas fa-edit" aria-hidden="true" />
                </span>
              </Link>
            </div>
            <div class="message-body">
              <small>Rent: €{rentPrice}</small>
              <br />
              <small>Deposit: €{deposit}</small>
              <br />
              <small>
                Contract ends on: {endDate ? endDate.substring(0, 10) : ""}
              </small>
            </div>
          </article>
        </div>
      
    );
  }
}

export default ContractItem;
