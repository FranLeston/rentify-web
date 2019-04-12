import React, { Component } from "react";
import { usersService, contractsService } from "../../services";
import { Link, NavLink, withRouter } from "react-router-dom";
import contractService from "../../services/contracts-service";
import DetailedContract from "./DetailedContract";
import { withAuthConsumer } from "../../contexts/AuthStore";

class Documents extends Component {
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

    return (
      <div className="container">
        <div className="box">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title is-centered">My Documents</p>
              <a
                href="#"
                className="card-header-icon"
                aria-label="more options"
              >
                <span className="icon">
                  <i className="fas fa-folder" aria-hidden="true" />
                </span>
              </a>
            </header>

            <div className="card-content">
              <div className="content">
                <div className="columns is-centered">
                  <div className="column is-3">
                    <figure className="image is-128x128">
                      <img src="http://files.softicons.com/download/folder-icons/blumarble-folders-icons-by-lukeedee/png/256x256/Documents.png" />
                    </figure>
                  </div>
                  <br />
                </div>
             
                <div className="columns is-centered">
                  <div className="column is-narrow">
                    <h5 className = "title is-5">Organize your documents in the following folders...</h5>
                    </div>
                  </div>
   <hr />

                <div className="columns is-2 is-centered">
                  <div className="column is-6">
                    <div className="box">
                      <span className="icon">
                        <i className="fas fa-file-signature" />
                      </span>
                      Contracts
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="box">
                      <span className="icon">
                        <i className="fas fa-id-card" />
                      </span>
                      ID's
                    </div>
                  </div>
                </div>
                <div className="columns is-2 is-centered">
                  <div className="column is-6">
                    <div className="box">
                      <span className="icon">
                        <i className="fas fa-receipt" />
                      </span>
                      Rent Receipts
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="box">
                      <span className="icon">
                        <i className="fas fa-burn" />
                      </span>
                      Utility Bills
                    </div>
                  </div>

                  <br />
                </div>
              </div>
            </div>
            <footer className="card-footer">
              <a href="#" className="card-footer-item">
                Upload New Document
              </a>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default Documents;
