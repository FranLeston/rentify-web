import React, { Component } from "react";
import { usersService } from "../../services";
import { Link, NavLink, withRouter } from "react-router-dom";
import contractService from "../../services/contracts-service";
import ContractItem from "./ContractItem";
import { withAuthConsumer } from "../../contexts/AuthStore";

class Dashboard extends Component {
  state = {
    contracts: []
  };
  
  componentDidMount() {
    contractService
      .list()
      .then(contracts => this.setState({ contracts: contracts }));
  }

  handleDeleteContract = id => {
    this.setState({
      contracts: this.state.contracts.filter(contract => contract.id !== id)
    });
  };

  render() {
    const contracts = this.state.contracts.map(contract => (
      <ContractItem key={contract.id} {...contract} />
    ));

    return (
      <section className="section">
        <div className="columns is-2">
          <div className="column">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">My Properties</p>
                <a
                  href="#"
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
                  {contracts}
                  
                </div>
                <footer class="card-footer">
    <p class="card-footer-item">
      <span>
      <a href="users/properties">See All</a>
      </span>
    </p>
  </footer>
              </div>
              
            </div>
          </div>
          <div className="column">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris.
                  <a href="#">@bulmaio</a>. <a href="#">#css</a>{" "}
                  <a href="#">#responsive</a>
                  <br />
                  <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
              </div>
              <footer className="card-footer">
                <a href="#" className="card-footer-item">
                  Save
                </a>
                <a href="#" className="card-footer-item">
                  Edit
                </a>
                <a href="#" className="card-footer-item">
                  Delete
                </a>
              </footer>
            </div>
          </div>
        </div>

        <div className="columns is-2">
          <div className="column">
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
                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris.
                  <a href="#">@bulmaio</a>. <a href="#">#css</a>{" "}
                  <a href="#">#responsive</a>
                  <br />
                  <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
              </div>
              <footer className="card-footer">
                <a href="#" className="card-footer-item">
                  Save
                </a>
                <a href="#" className="card-footer-item">
                  Edit
                </a>
                <a href="#" className="card-footer-item">
                  Delete
                </a>
              </footer>
            </div>
          </div>
          <div className="column">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris.
                  <a href="#">@bulmaio</a>. <a href="#">#css</a>{" "}
                  <a href="#">#responsive</a>
                  <br />
                  <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
              </div>
              <footer className="card-footer">
                <a href="#" className="card-footer-item">
                  Save
                </a>
                <a href="#" className="card-footer-item">
                  Edit
                </a>
                <a href="#" className="card-footer-item">
                  Delete
                </a>
              </footer>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
