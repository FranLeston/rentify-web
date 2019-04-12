import React, { Fragment, Component } from "react";
import { usersService } from "../../services";
import { Link, NavLink, withRouter } from "react-router-dom";
import contractService from "../../services/contracts-service";
import ContractItem from "./ContractItem";
import { withAuthConsumer } from "../../contexts/AuthStore";
import RentItem from "./RentItem";
import MaintenanceItem from "./MaintenanceItem";
import maintenanceService from "../../services/maintenance-service";

class Dashboard extends Component {
  state = {
    contracts: [],
    userContracts: [],
    maintenances: []
  };

  componentDidMount() {
    contractService
      .listOwn()
      .then(contracts => this.setState({ contracts: contracts }));
    contractService
      .getTenantContract()
      .then(userContracts => this.setState({ userContracts: userContracts }));
    maintenanceService
      .list()
      .then(maintenances => this.setState({ maintenances: maintenances }));
  }

  handleDeleteContract = id => {
    this.setState({
      contracts: this.state.contracts.filter(contract => contract.id !== id)
    });
  };

  render() {
    const { user, isAuthenticated, isAdmin } = this.props;

    const contracts = this.state.contracts.map(contract => (
      <ContractItem key={contract.id} {...contract} />
    ));

    const userContracts = this.state.userContracts.map(userContract => (
      <RentItem key={userContract.id} {...userContract} />
    ));

    const maintenances = this.state.maintenances.map(maintenance => (
      <MaintenanceItem key={maintenance.id} {...maintenance} />
    ));

    return (
      <section class="section">
        {isAdmin() && (
          <Fragment>
            <div className="columns is-centered">
              <div className="column is-5">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">My Properties</p>
                    <a
                      href="/users/properties"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="fas fa-home" aria-hidden="true" />
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    <div className="content">{contracts}</div>
                    <footer class="card-footer">
                      <p class="card-footer-item">
                        <span>
                          <a href="/users/properties">See All</a>
                        </span>
                      </p>
                    </footer>
                  </div>
                </div>
              </div>

              <div className="column is-5">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">Notifications</p>
                    <a
                      href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="fas fa-bell" aria-hidden="true" />
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      Francisco L. has paid €750 for RENT on: March 29, 2019
                      <hr />
                      Francisco L. has paid €1,500 for DEPOSIT on: April 1, 2019
                    </div>
                  </div>
                  <footer class="card-footer">
                    <p class="card-footer-item">
                      <span>
                        <a href="/users/properties">See All</a>
                      </span>
                    </p>
                  </footer>
                </div>
              </div>
            </div>

            <div className="columns is-centered">
              <div className="column is-5">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">Maintenance Requests</p>
                    <a
                      href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="fas fa-wrench" aria-hidden="true" />
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    <div className="content">{maintenances}</div>
                  </div>
                </div>
              </div>

              <div className="column is-5">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">Due Dates</p>
                    <a
                      href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="fas fa-calendar" aria-hidden="true" />
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      Bank Deposit for Malagon 2 is due: April 29, 2019
                      <hr />
                      Rent for Malagon 2 is due: May 30, 2019
                    </div>
                  </div>
                  <footer class="card-footer">
                    <p class="card-footer-item">
                      <span>
                        <a href="/users/properties">See All</a>
                      </span>
                    </p>
                  </footer>
                </div>
              </div>
            </div>
          </Fragment>
        )}

        {!isAdmin() && (
          <Fragment>
            <div className="columns is-centered">
              <div className="column is-5">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">My Rent</p>
                    <a
                      href="/users/properties"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i
                          className="fas fa-money-check-alt"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    <div className="content">{userContracts}</div>
                  </div>
                </div>
              </div>

              <div className="column is-5">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">Notifications</p>
                    <a
                      href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="fas fa-bell" aria-hidden="true" />
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      You have paid your DEPOSIT €1,500 on April 1, 2019
                      <hr />
                      You have paid your RENT €750 on March 29, 2019
                    </div>
                    <footer class="card-footer">
                      <p class="card-footer-item">
                        <span>
                          <a href="/users/my-rent">See All</a>
                        </span>
                      </p>
                    </footer>
                  </div>
                </div>
              </div>
            </div>

            <div className="columns is-centered">
              <div className="column is-5">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">Maintenance Requests</p>
                    <a
                      href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="fas fa-wrench" aria-hidden="true" />
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    <div className="content">{maintenances}</div>
                  </div>
                </div>
              </div>

              <div className="column is-5">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">Due Dates</p>
                    <a
                      href="#"
                      className="card-header-icon"
                      aria-label="more options"
                    >
                      <span className="icon">
                        <i className="fas fa-calendar" aria-hidden="true" />
                      </span>
                    </a>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      Your RENT €750 is due on: May 1, 2019
                      <hr />
                    </div>
                  </div>
                  <footer class="card-footer">
                      <p class="card-footer-item">
                        <span>
                          <a href="/users/my-rent">See All</a>
                        </span>
                      </p>
                    </footer>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </section>
    );
  }
}

export default withRouter(withAuthConsumer(Dashboard));
