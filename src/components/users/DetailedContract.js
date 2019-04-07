import React, { Component } from "react";
import contractService from "../../services/contracts-service";
import { Link } from "react-router-dom";

class ContractItem extends Component {
  handleDelete = id => {
    contractService.deleteContract(id).then(() => this.props.onClickDelete(id));
  };

  render() {
    const {
      id,
      address,
      tenantEmail,
      rentPrice,
      startDate,
      endDate,
      info,
      regNumber,
      contractURL,
      deposit
    } = this.props;

    return (
      <div className="box" keykey={id}>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              <Link to={`/users/edit-contract/${id}`} aria-label="edit">
                {address}
              </Link>
            </p>

            <a
              href={`/users/edit-contract/${id}`}
              className="card-header-icon"
              aria-label="more options"
            >
              <span className="icon">
                <i className="fas fa-home" aria-hidden="true" />
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className="content">
              <div className="columns">
                <div className="column">
                  <strong>Tenant Email:</strong> {tenantEmail}
                  <br />
                  <strong>Contract Started:</strong> {startDate}
                  <br />
                  <strong>Contract Ends:</strong> {endDate}
                  <br />
                  <strong>Contract Document:</strong> <a href={contractURL}>Download</a>  
                </div>
                <div className="column">
                  <strong>Registry Number:</strong> {regNumber}
                  <br />
                  <strong>Additional Information:</strong> {info}
                  <br />
                  <strong>Deposit: €</strong> {deposit}
                  <br />
                  <strong>Rent Price: €</strong> {rentPrice}

                </div>
              </div>
            </div>
            <footer className="card-footer">
   
    <a href="#" className="card-footer-item">Edit</a>
    <a href="#" className="card-footer-item">Delete</a>
  </footer>
</div>
          </div>
        </div>
      
    );
  }
}

export default ContractItem;
