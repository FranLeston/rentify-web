import React, { Component } from "react";
import maintenanceService from "../../services/maintenance-service";
import { Link } from "react-router-dom";

class MaintenanceItem extends Component {
  handleDelete = id => {
    maintenanceService
      .deleteContract(id)
      .then(() => this.props.onClickDelete(id));
  };

  render() {
    const { id, title, description, isFixed, imageURL } = this.props;

    return (
      <div className="box" keykey={id}>
        <article className="message is-info">
          <div className="message-header">
            <Link to={`/users/edit-maintenance/${id}`}>{title}</Link>
            <Link to={`/users/edit-maintenance/${id}`}>
              <span className="icon is-right">
                <i className="fas fa-edit" aria-hidden="true" />
              </span>
            </Link>
          </div>
          <div className="message-body">
            <div className="columns">
              <div className="column">
                <figure className="image is-128x128">
                  <img src={imageURL} />
                </figure>
              </div>
              <div className="column">Description: {description}</div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default MaintenanceItem;
