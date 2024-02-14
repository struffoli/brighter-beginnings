import React from "react";
import { Link } from "react-router-dom";

const OrganizationsCard = (props) => {
  return (
    <div key={props.index} className="col-md-4 mb-4">
      <div className="card">
        <Link to={`/organizations/${props.name}`} className="link">
          <img
            className="card-img-top"
            src={props.img_src}
            style={{ objectFit: "cover", height: "300px" }}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title" style={{ paddingBottom: "4px" }}>
            <Link to={`/about/${props.name}`} className="link">
              <b>{props.name}</b>
            </Link>
          </h5>
          <p className="card-text">{props.location}</p>
          <p className="card-text">{props.distance}</p>
          <p className="card-text">{props.contactInfo}</p>
          <p className="card-text">{props.organizationType}</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsCard;
