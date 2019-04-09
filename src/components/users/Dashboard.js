import React, { Fragment, Component } from "react";
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
      .listOwn()
      .then(contracts => this.setState({ contracts: contracts }));
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris.
                  <a href="#">@bulmaio</a>. <a href="#">#css</a>{" "}
                  <a href="#">#responsive</a>
                  <br />
                  <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
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
                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris.
                  <a href="#">@bulmaio</a>. <a href="#">#css</a>{" "}
                  <a href="#">#responsive</a>
                  <br />
                  <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris.
                  <a href="#">@bulmaio</a>. <a href="#">#css</a>{" "}
                  <a href="#">#responsive</a>
                  <br />
                  <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
              </div>
              
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris.
            <a href="#">@bulmaio</a>. <a href="#">#css</a>{" "}
            <a href="#">#responsive</a>
            <br />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
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
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris.
            <a href="#">@bulmaio</a>. <a href="#">#css</a>{" "}
            <a href="#">#responsive</a>
            <br />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris.
            <a href="#">@bulmaio</a>. <a href="#">#css</a>{" "}
            <a href="#">#responsive</a>
            <br />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
        
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
