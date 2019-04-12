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
      message = "landlord";
    }
    return message;
  }
};

export default class Register extends Component {
  state = {
    user: {
      name: "",
      email: "",
      password: "",
      role: "landlord"
    },
    errors: {
      name: validations.name(),
      email: validations.email(),
      password: validations.password(),
     

    },
    touch: {},
    isAuthenticated: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
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
        user => this.setState({ isAuthenticated: true }),
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
    const { isAuthenticated, errors, user, touch } = this.state;
    if (isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="register">
        <div className="columns is-centered">
          <div className="column is-4">
            <div className="block">
              <div className="box">
              <div className="columns is-centered">
                 
                    <h4 className="title is-4">Register</h4>
                    </div>
                    <br />

                    <div className="columns is-centered">
                    <p>Welcome!</p>
                    </div>

                    <div className="columns is-centered">
                    <p>Sign up to get started</p>
                    </div>
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
                              value="landlord"
                              checked={user.role === 'landlord'}
                              onChange={this.handleChange}
                            /> I am a Landlord
                          </label>
                          <label className="radio">
                            <input
                              type="radio"
                              className={`${touch.role &&
                                errors.role &&
                                "is-danger"}`}
                              name="role"
                              value="tenant"
                              checked={user.role === 'tenant'}
                              onChange={this.handleChange}
                            /> I am a Tenant
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>


<div className="columns is-centered">
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
                  </div>
                  <br/>
                  <div className="columns is-centered">
                  
                  <h6 class="subtitle is-6">By signing up you agree to our terms and conditions</h6>
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
