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
                  {isAuthenticated() && (
                    <Fragment>
                      <span className="navbar-item">
                        Hello {user.name}, you are a{" "}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </Fragment>
                  )}
                </div>
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons">
                      {isAuthenticated() && (
                        <Fragment>
                          <div class="dropdown is-hoverable">
                            <div class="dropdown-trigger">
                              <button
                                class="button"
                                aria-haspopup="true"
                                aria-controls="dropdown-menu"
                              >
                                <span>{user.email}</span>
                                <span class="icon is-small">
                                  <i
                                    class="fas fa-angle-down"
                                    aria-hidden="true"
                                  />
                                </span>
                              </button>
                            </div>
                            <div
                              class="dropdown-menu"
                              id="dropdown-menu"
                              role="menu"
                            >
                              <div class="dropdown-content">
                                <a href="#" class="dropdown-item">
                                  Edit Profile
                                </a>
                                <a class="dropdown-item">
                                  <NavLink
                                    className="nav-link"
                                    onClick={this.handleLogout}
                                    activeClassName="active"
                                    to="/logout"
                                  >
                                    Logout
                                  </NavLink>
                                </a>
                                <hr class="dropdown-divider" />
                                <span class="dropdown-item">
                                  {user.role.charAt(0).toUpperCase() +
                                    user.role.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      )}
                      <div className="buttons">
                        {!isAuthenticated() && (
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      
    );
  }
}

export default withRouter(withAuthConsumer(NavBar));
