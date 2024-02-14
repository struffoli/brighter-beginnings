import React from "react";
import { Link } from "react-router-dom";

const ScholarshipsCard = (props) => {
  return (
    <div key={props.index} className="col-md-4 mb-4">
      <div className="card">
        <Link to={`/scholarships/${props.name}`} className="link">
          <img
            className="card-img-top"
            src={props.img_src}
            style={{ objectFit: "cover", height: "300px" }}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title" style={{ paddingBottom: "4px" }}>
            <Link to={`/scholarships/${props.name}`} className="link">
              <b>{props.name}</b>
            </Link>
          </h5>
          <p className="card-text">
            <b>Awarded By:</b> {props.donor}
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
            <b>Number of Recipients:</b> {props.people}
          </p>
          <p className="card-text">
            <b>Requirements:</b> {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsCard;
