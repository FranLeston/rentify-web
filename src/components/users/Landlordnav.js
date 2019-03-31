import React, { Component } from "react";
import { usersService } from "../../services";

class LandlordNav extends Component {
  render() {
    const { id, name, email, role } = this.props;

    return (
      <div className="section">
        <div className="block">
          <div className="columns">
            <div className="column is-4">
              <aside className="menu">
                <p className="menu-label">You</p>
                <ul className="menu-list">
                  <li>
                    <a heref="">Dashboard</a>
                  </li>
                  <li>
                    <a heref="">Me</a>
                  </li>

                  <li>
                    <a heref="">My Documents</a>
                  </li>
                </ul>
                <hr />
                <p className="menu-label">Your Tenants</p>
                <ul className="menu-list">
                  <li>
                    <a heref="">Contracts</a>
                  </li>
                  <li>
                    <a heref="">Tenants</a>
                  </li>

                  <li>
                    <a heref="">Other</a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandlordNav;
