import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import authService from "../../services/auth-service";
import { withAuthConsumer } from "../../contexts/AuthStore";

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validations = {
  email: value => {
    let message;
    if (!value) {
      message = "Email is required";
    } else if (!EMAIL_PATTERN.test(value)) {
      message = "Invalid email pattern";
    }
    return message;
  },
  password: value => {
    let message;
    if (!value) {
      message = "Password is required";
    }
    return message;
  }
};

class Login extends Component {
  state = {
    user: {
      email: "",
      password: ""
    },
    errors: {
      email: validations.email(),
      password: validations.password()
    },
    touch: {},
    isAuthenticated: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    });
  };

  handleBlur = event => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isValid()) {
      authService.authenticate(this.state.user).then(
        user => {
          this.setState({ isAuthenticated: true });
          this.props.onUserChanged(user);
        },
        error => {
          const { message, errors } = error.response.data;
          this.setState({
            errors: {
              ...errors,
              password: !errors && message
            },
            touch: {
              ...errors,
              password: !errors && message
            }
          });
        }
      );
    }
  };

  isValid = () => {
    return !Object.keys(this.state.user).some(attr => this.state.errors[attr]);
  };

  render() {
    const { isAuthenticated, errors, user, touch } = this.state;
    if (isAuthenticated) {
      return <Redirect to="/users/dashboard" />;
    }

    return (
      <div className="login">
        <div className="columns is-centered">
          <div className="column is-4">
            <div className="block">
              <div className="box">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <input
                        type="text"
                        className={`input is-success ${touch.email &&
                          errors.email &&
                          "is-danger"}`}
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                        value={user.email}
                        onBlur={this.handleBlur}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope" />
                      </span>
                      <span className="icon is-small is-right">
                        <i className="fas fa-check" />
                      </span>
                      <div className="is-danger">{errors.email}</div>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input
                        type="password"
                        className={`input ${touch.password &&
                          errors.password &&
                          "is-danger"}`}
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={user.password}
                        onBlur={this.handleBlur}
                      />

                      <span className="icon is-small is-left">
                        <i className="fas fa-lock" />
                      </span>
                      <div className="is-danger">{errors.password}</div>
                    </p>
                  </div>
                  
                  <div className="columns is-centered">
                    <div className="field">
                      <p className="control">
                        <button
                          className="button is-info"
                          disabled={!this.isValid()}
                        >
                          Login
                        </button>
                      </p>
                    </div>
                  </div>
                  
                  <hr />
                  <p className="text-center">
                    Don't have an account? <Link to="/register">Sign up</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthConsumer(Login);
