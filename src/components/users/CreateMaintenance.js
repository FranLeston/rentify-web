import React, { Component } from "react";
import { Link, NavLink, withRouter, Redirect } from "react-router-dom";
import maintenanceService from "../../services/maintenance-service";

const validations = {
  title: value => {
    let message;
    if (!value) {
      message = "Enter the title";
    }
    return message;
  },
  description: value => {
    let message;
    if (!value) {
      message = "Description is required";
    }
    return message;
  },
  attachment: value => {
    let message;
    if (!value) {
      message = "Upload maintenance JPG";
    }
    return message;
  }
};

const defaultState = {
  maintenance: {
    title: "",
    description: ""
  },
  errors: {
    title: validations.title(),
    description: validations.description()
  },
  touch: {},
  isSuccess: false
};

export default class CreateMaintenance extends Component {
  state = { ...defaultState };

  handleChange = event => {
    const { name, value, files } = event.target;
    console.log(files);
    this.setState({
      maintenance: {
        ...this.state.maintenance,
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
      maintenanceService
        .getMaintenance(match.params.id)
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
    if (this.isValid()) {
      if (this.props.match.params.id) {
        maintenanceService
          .updateMaintenance(this.state.maintenance.id, this.state.maintenance)
          .then(
            maintenance => this.setState({ isSuccess: true }),
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
        maintenanceService.createMaintenance(this.state.maintenance).then(
          maintenance => this.setState({ isSuccess: true }),
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
    return !Object.keys(this.state.maintenance).some(
      attr => this.state.errors[attr]
    );
  };

  render() {
    const { isSuccess, errors, maintenance, touch } = this.state;
    if (isSuccess) {
      return <Redirect to="/users/dashboard" />;
    }

    return (
      <div className="column is-offset-2 is-6">
        <div className="box">
          <div className="columns is-centered">
            <div className="column is-2">
              <figure class="image is-64x64">
                <img src="https://cdn1.iconfinder.com/data/icons/all_google_icons_symbols_by_carlosjj-du/128/wrench-lb.png" />
              </figure>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-5">
              <h4 className="title is-4">Maintenance Request</h4>
            </div>
          </div>
          <br />
          <h5 className="subtitle is-5">Put in your request here</h5>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Subject</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input ${touch.title &&
                    errors.name &&
                    "is-success"}`}
                  name="title"
                  onChange={this.handleChange}
                  value={maintenance.title}
                  onBlur={this.handleBlur}
                  type="text"
                  placeholder="Title"
                />

                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
              <p className="help is-danger">{errors.title}</p>
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input ${touch.description &&
                    errors.name &&
                    "is-success"}`}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  type="text"
                  name="description"
                  value={maintenance.description}
                  placeholder="Description"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-address-card" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
              <p className="help is-danger">{errors.description}</p>
            </div>

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
                  <span className="file-label">Upload an image...</span>
                </span>
                <span className="file-name">
                  {this.state.maintenance.attachment &&
                    this.state.maintenance.attachment.name}
                </span>
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
