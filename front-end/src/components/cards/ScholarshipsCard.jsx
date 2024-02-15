import React from "react";
import { Link } from "react-router-dom";

const ScholarshipsCard = (props) => {
  return (
    <div key={props.index} className="col-md-4 mb-4">
      <div className="card">
        <Link to={`/scholarships/schp?name=${props.name}`} className="link">
          <img
            className="card-img-top"
            src={props.img_src}
            style={{ objectFit: "cover", height: "300px" }}
            alt={`A logo/icon of the scholarship ${props.name}.`}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title" style={{ paddingBottom: "4px" }}>
            <Link to={`/scholarships/schp?name=${props.name}`} className="link">
              <b>{props.name}</b>
            </Link>
          </h5>
          <p className="card-text">
            <b>Donor:</b> {props.donor}
          </p>
          <p className="card-text">
            <b>Awarded by: </b>
            <Link to={`/organizations/org?name=${props.organization}`} className="link">
              <b>{props.organization}</b>
            </Link>
          </p>
          <p className="card-text">
            <b>Eligible for students from: </b>
            <Link to={`/cities/city?name=${props.city}`} className="link">
              <b>{props.city}</b>
            </Link>
          </p>
          <p className="card-text">
            <b>Area:</b> {props.area}
          </p>
          <p className="card-text">
            <b>Age Group:</b> {props.ageGroup}
          </p>
          <p className="card-text">
            <b>Award:</b> {props.award}
          </p>
          <p className="card-text">
            <b>Number of Recipients:</b> {props.recipients}
          </p>
          <p className="card-text">
            <b>Description:</b> {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsCard;
