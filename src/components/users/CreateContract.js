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

const defaultState = {
  contract: {
    tenantEmail: "",
    address: "",
    regNumber: "",
    info: "",
    rentPrice: "",
    attachment: "",
    startDate: "",
    endDate: ""
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

export default class CreateContract extends Component {
  state = { ...defaultState };

  handleChange = event => {
    const { name, value, files } = event.target;
    console.log(files);
    this.setState({
      contract: {
        ...this.state.contract,
        [name]: files && files[0] ? files[0] : value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    });
  };

  componentDidMount() {
    const { match } = this.props;
    if (match.params.id) {
      contractService
        .getContract(match.params.id)
        .then(
          contract => this.setState({ contract }),
          error => console.log(error)
        );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id && !this.props.match.params.id) {
      this.setState({ ...defaultState });
    }
  }

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
    console.log(this.state.contract);
    if (this.isValid()) {
      if (this.props.match.params.id) {
        contractService.updateContract(this.state.contract.id,this.state.contract).then(
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
      } else {
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
      <div className="column is-offset-2 is-6">
        <div className="box">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Tenant's Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input ${touch.tenantEmail &&
                    errors.name &&
                    "is-success"}`}
                  name="tenantEmail"
                  onChange={this.handleChange}
                  value={contract.tenantEmail}
                  onBlur={this.handleBlur}
                  type="text"
                  placeholder="Email"
                />

                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
              <p className="help is-danger">{errors.tenantEmail}</p>
            </div>

            <div className="field">
              <label className="label">Tenant's Address</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input ${touch.address &&
                    errors.name &&
                    "is-success"}`}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  type="text"
                  name="address"
                  value={contract.address}
                  placeholder="Tenants Address"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-address-card" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
              <p className="help is-danger">{errors.address}</p>
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
                  value={
                    contract.startDate
                      ? contract.startDate.substring(0, 10)
                      : ""
                  }
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
                  value={
                    contract.endDate ? contract.endDate.substring(0, 10) : ""
                  }
                  type="date"
                  name="endDate"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Property Registry Number</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input ${touch.regNumber &&
                    errors.name &&
                    "is-success"}`}
                  type="text"
                  name="regNumber"
                  value={contract.regNumber}
                  placeholder="Registry Number"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-building" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
              <p className="help is-danger">{errors.regNumber}</p>
            </div>

            <div className="field">
              <label className="label">Additional Info</label>
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className={`input ${touch.info &&
                    errors.name &&
                    "is-success"}`}
                  placeholder="Additional Info"
                  name="info"
                  value={contract.info}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-info" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
              <p className="help is-danger">{errors.info}</p>
            </div>

            <div className="field has-addons has-addons-left">
              <p className="control">
                <span className="select">
                  <select>
                    <option>€</option>
                  </select>
                </span>
              </p>
              <p className="control">
                <input
                  className={`input ${touch.rentPrice &&
                    errors.name &&
                    "is-success"}`}
                  name="rentPrice"
                  value={contract.rentPrice}
                  type="text"
                  placeholder="Monthly Rent Amount"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </p>
            </div>
            <p className="help is-danger">{errors.rentPrice}</p>

            <div className="file is-info has-name">
              <label className="file-label">
                <input
                  className="file-input"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  type="file"
                  name="attachment"
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload" />
                  </span>
                  <span className="file-label">Upload a a contract...</span>
                </span>
                <span className="file-name">MyFile.pdf</span>
              </label>
            </div>
            <hr />
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-info">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
