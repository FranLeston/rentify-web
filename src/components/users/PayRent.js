import React, { Component } from "react";
import contractService from "../../services/contracts-service";
import { Link } from "react-router-dom";

class PayRent extends Component {
  handleDelete = id => {
    contractService.deleteContract(id).then(() => this.props.onClickDelete(id));
  };

  render() {
    const { id, tenantEmail, address, rentPrice, endDate } = this.props;

    return (
      <div className="columns is-centered">
        <div className="column is-8">
          <div className="box">
            <div className="card">
              <header className="card-header ">
                <p className="card-header-title is-centered">{tenantEmail}</p>
                <a
                  href="#"
                  className="card-header-icon"
                  aria-label="more options"
                >
                  <span className="icon">
                    <i className="fas fa-angle-down" aria-hidden="true" />
                  </span>
                </a>
              </header>
              <div className="card-content">
                <div className="content">
                <div className="columns is-centered">
                <div className="column is-4">

                <h1 className="title is-4">Pay your rent here</h1>
                </div>
                </div>
                <hr/>
                  <h6 className="subtitle is-6"> Amount Due: €{rentPrice}</h6>
                  <br />
                  <h6 className="subtitle is-6">Address: {address}</h6>
                  <hr />
                  <div className="columns is-centered">
                <div className="column is-3">
                  <h6 className="subtitle is-6">Payment Method</h6>
                  </div>
                  </div>
                  <br />
                  <br />
                  <div className="field">
                  <div className="columns">
                  <div className="column">

                    <div className="control">
                      <label className="radio">
                        <figure class="image is-64x64">
                          <img src="http://pluspng.com/img-png/atm-card-png-download-atm-card-png-images-transparent-gallery-advertisement-advertisement-400.png" />
                        </figure>
                        <input type="radio" name="payment" />
                        {" "} VISA / Mastercard
                      </label>
                      </div>
                      </div>

                      <br />
                      <br />
                      <div className="column">

                      <label className="radio">
                      <figure class="image is-64x64">
                          <img src="http://pngimg.com/uploads/paypal/paypal_PNG22.png" />
                        </figure>
                        <input type="radio" name="payment" />
                        {" "} PayPal
                      </label>
                      <br />
                      <br />
                      </div>
                      <div className="column">

                      <label className="radio">
                      <figure class="image is-64x64">
                          <img src="https://img.pngio.com/payments-vivendum-classics-bank-transfer-png-300_200.png" />
                        </figure>
                        <input type="radio" name="payment" />
                        
                        {" "} Bank Transfer
                      </label>
                      </div>

                    </div>
                  </div>
                  </div>
                </div>
              </div>
          

            <footer className="card-footer">
              <a href="/users/my-rent" className="card-footer-item">
                <a class="button is-danger">Pay Rent</a>
              </a>
            </footer>
          </div>
        </div>
          </div>
    );
  }
}

export default PayRent;
