import React, { Component } from "react";
import { usersService } from "../../services";
import { Link, NavLink, withRouter } from "react-router-dom";

class LandlordNav extends Component {
  render() {
    return (
      <aside className="menu">
        <p className="menu-label">You</p>
        <ul className="menu-list">
          <li>
            <NavLink
            
              className="button is-rounded is-light"
              activeClassName="button is-rounded is-link"
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
              activeClassName="button is-rounded is-link"
              to="/users/new-contract"
            >
              <span className="icon">
                <i className="fas fa-file-signature" />
              </span>
              <span>New Contract</span>
            </NavLink>
          </li>
          <br />
          <li>
          <NavLink
              className="button is-rounded is-light"
              activeClassName="button is-rounded is-link"
              to="/users/properties"
            >
              <span className="icon">
                <i className="fas fa-building" />
              </span>
              <span>Properties</span>
            </NavLink>
          </li>
          <br />
          <li>
          <NavLink
              className="button is-rounded is-light"
              activeClassName="button is-rounded is-link"
              to="/users/my-docs"
            >
              <span className="icon">
                <i className="fas fa-folder-open" />
              </span>
              <span>My Documents</span>
            </NavLink>
          </li>
        </ul>
        <hr />
        <p className="menu-label">Your Tenants</p>
        <ul className="menu-list">
          <li>
            <a heref="">Contracts</a>
          </li>
          <br />
          <li>
            <a heref="">Tenants</a>
          </li>
          <br />
          <li>
            <a heref="">Other</a>
          </li>
        </ul>
      </aside>
    );
  }
}

export default LandlordNav;
