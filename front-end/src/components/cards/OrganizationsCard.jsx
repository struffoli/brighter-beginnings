import React from "react";
import { Link } from "react-router-dom";

const OrganizationsCard = (props) => {
  return (
    <div key={props.index} className="col-md-4 mb-4">
      <div className="card">
        <Link to={`/organizations/org?name=${props.name}`} className="link">
          <img
            className="card-img-top"
            src={props.img_src}
            style={{ objectFit: "cover", height: "300px" }}
            alt={`A logo/icon of the organization ${props.name}.`}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title" style={{ paddingBottom: "4px" }}>
            <Link to={`/organizations/org?name=${props.name}`} className="link">
              <b>{props.name}</b>
            </Link>
          </h5>
          <p className="card-text">
            <b>Description: </b> {props.description}
          </p>
          <p className="card-text">
            <b>Location: </b>
            {props.location}
          </p>
          <p className="card-text">
            <b>City: </b>
            <Link to={`/cities/city?name=${props.city}`} className="link">
              <b>{props.city}</b>
            </Link>
          </p>
          <p className="card-text">
            <b>Contact: </b>
            {props.contactInfo}
          </p>
          <p className="card-text">
            <b>Organization Type: </b>
            {props.organizationType}
          </p>
          <p className="card-text">
            <Link to={`/scholarships/schp?name=${props.scholarship}`} className="link">
              <b>Click here to see scholarships!</b>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsCard;
