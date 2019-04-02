import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
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

export default class CreateContract extends Component {
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
    }

    return (

      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Tenant's Email</label>
          <div className="control">
            <input className="input" type="text" placeholder="Email" />
          </div>
        </div>

        <div className="field">
          <label className="label">Tenant's Address</label>
          <div className="control">
            <input className="input" type="text" placeholder="Tenants Address" />
          </div>
        </div>

        <div className="field">
          <label className="label">Property Registry Number</label>
          <div className="control">
            <input className="input" type="text" placeholder="Registry Number" />
          </div>
        </div>

        <div className="field">
          <label className="label">Additional Info</label>
          <div className="control">
            <textarea className="textarea" placeholder="Additional Info" />
          </div>
        </div>

        <div className="field has-addons has-addons-left">
  <p className="control">
    <span className="select">
      <select>
        <option>$</option>
        <option>£</option>
        <option>€</option>
      </select>
    </span>
  </p>
  <p className="control">
    <input className="input" type="text" placeholder="Monthly Rent Amount"/>
  </p>
</div>

        <div className="file has-name">
  <label className="file-label">
    <input className="file-input" type="file" name="resume"/>
    <span className="file-cta">
      <span className="file-icon">
        <i className="fas fa-upload"></i>
      </span>
      <span className="file-label">
        Upload a a contract...
      </span>
    </span>
    <span className="file-name">
      ContractForMatthew.pdf
    </span>
  </label>
</div>
<hr/>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}
