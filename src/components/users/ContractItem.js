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
        <div className="block">
          <article class="message is-link">
            <div class="message-header">
              <Link
                to={`/users/edit-contract/${id}`}
                className="card-header-icon"
                aria-label="edit"
              >{address}
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
              <small>Contract ends on: {
                    endDate ? endDate.substring(0, 10) : ""
                  }</small>
            </div>
          </article>
        </div>
      </div>

      // <div className="content" keykey={id}>
      //   <Link
      //     to={`/users/edit-contract/${id}`}
      //     className="card-header-icon"
      //     aria-label="edit"
      //   >
      //     <div className="columns">
      //       <div className="column is-11">
      //         <strong>{address}</strong>
      //       </div>
      //       <div className="column">
      //         <span className="icon">
      //           <i className="fas fa-edit" aria-hidden="true" />
      //         </span>
      //       </div>
      //     </div>
      //   </Link>
      //   <small>Rent: €{rentPrice}</small>
      //   <br />
      //   <small>Tenant: {tenantEmail}</small>
      // </div>
    );
  }
}

export default ContractItem;
