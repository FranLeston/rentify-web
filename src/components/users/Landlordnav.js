import React, { Fragment, Component } from "react";
import { usersService } from "../../services";
import { Link, NavLink, withRouter } from "react-router-dom";
import { withAuthConsumer } from "../../contexts/AuthStore";
import { authService } from "../../services";

class LandlordNav extends Component {
  render() {
    const { user, isAuthenticated, isAdmin } = this.props;

    return (
      <aside className="menu">
        <p className="menu-label">You</p>
        <ul className="menu-list">
          <li>
            <NavLink
              className="button is-rounded is-light"
              activeClassName="button is-rounded is-info"
              to="/users/dashboard"
            >
              <span className="icon is-large">
                <i className="fas fa-tachometer-alt" />
              </span>
              <span>DashBoard</span>
            </NavLink>
          </li>
          <br />
          
              <li>
                <NavLink
                  className="button is-rounded is-light"
                  activeClassName="button is-rounded is-info"
                  to="/users/documents"
                >
                  <span className="icon">
                    <i className="fas fa-folder-open" />
                  </span>
                  <span>My Documents</span>
                </NavLink>
              </li>
            

          <br />

          {!isAdmin() && (
            <Fragment>
              <li>
                <NavLink
                  className="button is-rounded is-light"
                  activeClassName="button is-rounded is-info"
                  to="/users/my-rent"
                >
                  <span className="icon">
                    <i className="fas fa-money-check-alt" />
                  </span>
                  <span>My Rent</span>
                </NavLink>
              </li>
            </Fragment>
          )}

          <br />

       
        </ul>
        <hr />
{!isAdmin() && (
        <p class="menu-label">Home</p>
)}
{isAdmin() && (
  <p class="menu-label">Properties</p>
)}

        <ul class="menu-list">

        {!isAdmin() && (
            <Fragment>
              <li>
                <NavLink
                  className="button is-rounded is-light"
                  activeClassName="button is-rounded is-info"
                  to="/users/maintenance"
                >
                  <span className="icon">
                    <i className="fas fa-wrench" />
                  </span>
                  <span>Maintenance Request</span>
                </NavLink>
              </li>
            </Fragment>
          )}

          {isAdmin() && (
            <Fragment>
              <li>
                <NavLink
                  className="button is-rounded is-light"
                  activeClassName="button is-rounded is-info"
                  to="/users/new-contract"
                >
                  <span className="icon">
                    <i className="fas fa-file-signature" />
                  </span>
                  <span>New Contract</span>
                </NavLink>
              </li>
            </Fragment>
          )}
          <li>
            <br />
            {isAdmin() && (
              <Fragment>
                <li>
                  <NavLink
                    className="button is-rounded is-light"
                    activeClassName="button is-rounded is-info"
                    to="/users/properties"
                  >
                    <span className="icon">
                      <i className="fas fa-building" />
                    </span>
                    <span>Properties</span>
                  </NavLink>
                </li>
              </Fragment>
            )}
          </li>
        </ul>
      </aside>
    );
  }
}

export default withRouter(withAuthConsumer(LandlordNav));
