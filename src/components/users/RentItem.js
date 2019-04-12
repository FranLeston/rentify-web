import React, { Component } from "react";
import contractService from "../../services/contracts-service";
import { Link } from "react-router-dom";

class RentItem extends Component {
  handleDelete = id => {
    contractService.deleteContract(id).then(() => this.props.onClickDelete(id));
  };

  render() {
    const { id, tenantEmail, address, rentPrice, endDate } = this.props;

    return (
      <div className="card">
          <header className="card-header is-centered">
            <p className="card-header-title">{tenantEmail}</p>
            <a href="#" className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className="content">
              <strong>Rent Amount: </strong>€{rentPrice} 
              <br/>
              <strong>Address: </strong>{address}
              <br />
            </div>
          </div>
          <footer className="card-footer">
            <a href="/users/my-rent" className="card-footer-item">
            <a class="button is-danger">Pay Rent</a>

              
            </a>
          </footer>
        </div>
      
    );
  }
}

export default RentItem;
