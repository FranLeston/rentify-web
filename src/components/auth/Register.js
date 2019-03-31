import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import authService from "../../services/auth-service";

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validations = {
  name: value => {
    let message;
    if (!value) {
      message = "Enter your Full Name";
    }
    return message;
  },
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
  },
  role: value => {
    let message;
    if (!value) {
      message = "I am a Landlord";
    }
    return message;
  }
};

export default class Register extends Component {
  state = {
    user: {
      name: "",
      email: "",
      password: ""
    },
    errors: {
      name: validations.name(),
      email: validations.email(),
      password: validations.password()
    },
    touch: {},
    isRegistered: false
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
      authService.register(this.state.user).then(
        user => this.setState({ isRegistered: true }),
        error => {
          const { message, errors } = error.response.data;
          this.setState({
            errors: {
              ...errors,
              email: !errors && message
            },
            touch: {
              ...errors,
              email: !errors && message
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
    const { isRegistered, errors, user, touch } = this.state;
    if (isRegistered) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="register">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="block">
              <div className="box">
                <form onSubmit={this.handleSubmit}>
                  <div class="field">
                    <label class="label">Your Name</label>
                    <div class="control has-icons-left has-icons-right">
                      <input
                        type="text"
                        className={`input ${touch.name &&
                          errors.name &&
                          "is-success"}`}
                        name="name"
                        placeholder="Name"
                        onChange={this.handleChange}
                        value={user.name}
                        onBlur={this.handleBlur}
                      />

                      <span class="icon is-small is-left">
                        <i class="fas fa-user" />
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check" />
                      </span>
                    </div>
                    <p class="help is-success">{errors.name}</p>
                  </div>

                  <div className="field">
                    <label className="label">Email</label>

                    <div className="control has-icons-left has-icons-right">
                      <input
                        type="text"
                        className={`input ${touch.email &&
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
                        <i className="fas fa-exclamation-triangle" />
                      </span>
                    </div>
                    <p className="help is-danger">{errors.email}</p>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left has-icons-right">
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
                      <span className="icon is-small is-right">
                        <i className="fas fa-check" />
                      </span>
                    </div>
                    <p className="help is-danger">{errors.password}</p>
                  </div>

                  <div className="columns is-centered">
                    <div className="field">
                      <div className="column is-full">
                        <div className="control ">
                          <label className="radio">
                            <input
                              type="radio"
                              className={`${touch.role &&
                                errors.role &&
                                "is-danger"}`}
                              name="role"
                              checked
                              value={user.role}
                              onBlur={this.handleBlur}
                            />{" "}
                            I am a Landlord
                          </label>
                          <label className="radio">
                            <input
                              type="radio"
                              className={`${touch.role &&
                                errors.role &&
                                "is-danger"}`}
                              name="role"
                              value={user.role}
                              onBlur={this.handleBlur}
                            />{" "}
                            I am a Tenant
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field is-grouped">
                    <div className="control">
                      <button
                        className="button is-info"
                        disabled={!this.isValid()}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
