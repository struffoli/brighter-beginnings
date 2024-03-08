import React from "react";
import { Link } from "react-router-dom";

const OrganizationsCard = (props) => {
  return (
    <div key={props.index} className="col-md-4 mb-4">
      <div className="card">
        <Link to={`/organizations/org?id=${props.id}`} className="link">
          <img
            className="card-img-top"
            src={props.img_src}
            style={{ objectFit: "cover", height: "300px" }}
            alt={`A logo/icon of the organization ${props.name}.`}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title" style={{ paddingBottom: "4px" }}>
            <Link to={`/organizations/org?id=${props.id}`} className="link">
              <b>{props.name}</b>
            </Link>
          </h5>
          <p className="card-text">
            <b>Org Number:</b> {props.id}
          </p>
          <p className="card-text">
            <b>Email:</b> {props.email}
          </p>
          <p className="card-text">
            <b>Phone:</b> {props.phone}
          </p>
          <p className="card-text">
            <b>Organization Type:</b> {props.organization_type}
          </p>
          {/* <p className="card-text">
            <b>City: </b>
            <Link to={`/cities/city?id=${props.city}`} className="link">
              {props.city}
            </Link>
          </p> */}
          {/* <p className="card-text">
            <b>Contact: </b>
            {props.contactInfo}
          </p>
          <p className="card-text">
            <b>Organization Type: </b>
            {props.organizationType}
          </p> */}
          <p className="card-text">
            <Link to={`/organizations/org?id=${props.id}`} className="link">
              Click here to see scholarships!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsCard;
