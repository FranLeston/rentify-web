import React, { Component } from "react";
import { Link, NavLink, withRouter, Redirect } from "react-router-dom";
import contractService from "../../services/contracts-service";

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validations = {
  address: value => {
    let message;
    if (!value) {
      message = "Enter the address";
    }
    return message;
  },
  tenantEmail: value => {
    let message;
    if (!value) {
      message = "Email is required";
    } else if (!EMAIL_PATTERN.test(value)) {
      message = "Invalid email pattern";
    }
    return message;
  },
  regNumber: value => {
    let message;
    if (!value) {
      message = "Enter the properties registry number";
    }
    return message;
  },
  info: value => {
    let message;
    if (!value) {
      message = "Enter additional information ";
    }
    return message;
  },
  rentPrice: value => {
    let message;
    if (!value) {
      message = "Enter the monthly rent you will like to charge";
    }
    return message;
  },
  attachment: value => {
    let message;
    if (!value) {
      message = "Upload contract PDF/JPG";
    }
    return message;
  },
  startDate: value => {
    let message;
    if (!value) {
      message = "Add Contract Start Date";
    }
    return message;
  },
  endDate: value => {
    let message;
    if (!value) {
      message = "Add Contract End Date";
    }
    return message;
  }
};

export default class CreateContract extends Component {
  state = {
    contract: {
      tenantEmail: "",
      address: "",
      regNumber: "",
      info: "",
      rentPrice: "",
      attachment: "",
      startDate: "",
      endDate:""
      
    },
    errors: {
      tenantEmail: validations.tenantEmail(),
      address: validations.address(),
      regNumber: validations.regNumber(),
      rentPrice: validations.rentPrice(),
      info: validations.info()

      // contractURL: validations.contractURL()
    },
    touch: {},
    isSuccess: false
  };

  handleChange = event => {
    const { name, value, files } = event.target;
    console.log(files)
    this.setState({
      contract: {
        ...this.state.contract,
        [name]: (files && files[0]) ? files[0] : value
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
      console.log("entra", this.state.contract);
      contractService.createContract(this.state.contract).then(
        contract => this.setState({ isSuccess: true }),
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
    return !Object.keys(this.state.contract).some(
      attr => this.state.errors[attr]
    );
  };

  render() {
    const { isSuccess, errors, contract, touch } = this.state;
    if (isSuccess) {
      return <Redirect to="/users/dashboard" />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Tenant's Email</label>
          <div className="control">
            <input
              className={`input ${touch.tenantEmail && errors.name && "is-success"}`}
              name="tenantEmail"
              onChange={this.handleChange}
              value={contract.email}
              onBlur={this.handleBlur}
              type="text"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Tenant's Address</label>
          <div className="control">
            <input
              className={`input ${touch.address &&
                errors.name &&
                "is-success"}`}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              type="text"
              name="address"
              placeholder="Tenants Address"
            />
          </div>
        </div>
        
        <div className="field">
          <label className="label">Start Date</label>
          <div className="control">
            <input
              className={`input ${touch.startDate &&
                errors.name &&
                "is-success"}`}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              type="date"
              name="startDate"
            />
          </div>
        </div>
       
        <div className="field">
          <label className="label">End Date</label>
          <div className="control">
            <input
              className={`input ${touch.endDate &&
                errors.name &&
                "is-success"}`}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              type="date"
              name="endDate"
            />
          </div>
        </div>
        


        <div className="field">
          <label className="label">Property Registry Number</label>
          <div className="control">
            <input
              className={`input ${touch.regNumber &&
                errors.name &&
                "is-success"}`}
              type="text"
              name="regNumber"
              placeholder="Registry Number"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Additional Info</label>
          <div className="control">
            <textarea
              className={`input ${touch.info && errors.name && "is-success"}`}
              placeholder="Additional Info"
              name="info"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </div>
        </div>

        <div className="field has-addons has-addons-left">
          <p className="control">
            <span className="select">
              <select>
                <option>€</option>
                <option>£</option>
                <option>$</option>
              </select>
            </span>
          </p>
          <p className="control">
            <input
              className={`input ${touch.rentPrice &&
                errors.name &&
                "is-success"}`}
              name="rentPrice"
              type="text"
              placeholder="Monthly Rent Amount"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </p>
        </div>

        <div className="file has-name">
          <label className="file-label">
            <input className="file-input" onChange={this.handleChange} onBlur={this.handleBlur} type="file" name="attachment" />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload" />
              </span>
              <span className="file-label">Upload a a contract...</span>
            </span>
            <span className="file-name">ContractForMatthew.pdf</span>
          </label>
        </div>
        <hr />
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-info">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}
