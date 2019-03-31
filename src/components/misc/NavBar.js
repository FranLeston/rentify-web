import React, { Fragment, Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { withAuthConsumer } from "../../contexts/AuthStore";
import { authService } from "../../services";

class NavBar extends Component {
  handleLogout = () => {
    authService.logout().then(() => {
      this.props.onUserChanged({});
      this.props.history.push("/login");
    });
  };

  render() {
    const { user, isAuthenticated, isAdmin } = this.props;

    return (
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-12">
            <nav
              className="navbar is-link"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <a className="navbar-item" href="/">
                  <img
                    src="https://bulma.io/images/bulma-logo.png"
                    width="112"
                    height="28"
                  />
                </a>
              </div>

              <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                  <a className="navbar-item">For Landlords</a>

                  <a className="navbar-item">{user.email}</a>

                  <a className="navbar-item">For Tenants</a>
                  <a className="navbar-item">{user.email}</a>
                </div>

                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons">
                      {!isAuthenticated() && (
                        <Fragment>
                          <a className="button is-info is-inverted">
                            <NavLink
                              className="nav-link"
                              activeClassName="active"
                              to="/register"
                            >
                              Register
                            </NavLink>
                          </a>
                        </Fragment>
                      )}
                      {isAuthenticated() && (
                        <Fragment>
                          <a className="button is-info is-inverted">
                            <NavLink
                              className="nav-link"
                              activeClassName="active"
                              to="/login"
                            >
                              Login
                            </NavLink>
                          </a>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuthConsumer(NavBar));
