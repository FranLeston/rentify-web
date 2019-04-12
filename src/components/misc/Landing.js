import React, { Fragment, Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { withAuthConsumer } from "../../contexts/AuthStore";
import { authService } from "../../services";

class Landing extends Component {
  render() {
    return (
      <div className="columns is-centered">
        <div className="column is-5">
          <div className="landing-column-padding">
            <div className="content">
              <h3 className="title is-3">Manage your rental in one place</h3>
              <p>
                Control your communication, contract, automated rent payment and
                maintenance issues in just one platform designed for you.{" "}
              </p>
              <br />
              <p>Designed for landlords and tenants.</p>
              <br />

              <div className="columns is-centered">
                <NavLink
                  className="button is-info"
                  activeClassName="button is-info"
                  to="/register"
                >
                  <span>Register for Free</span>
                </NavLink>
                <br />
</div>
<br />

                <div className="columns is-centered">
                  <h7 className="title is-7">
                    Already a member? <a href="/login">Login</a>
                  </h7>
                </div>
              
            </div>
          </div>
        </div>

        <div className="column">
          <figure className="image">
            <img src="https://www.ulc.org/assets/ulc/blog/scaled/woman-at-work.jpg" />
          </figure>
        </div>
      </div>
    );
  }
}

export default Landing;
