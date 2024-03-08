import React from "react";
import { Link } from "react-router-dom";

const ScholarshipsCard = (props) => {
  return (
    <div key={props.index} className="col-md-4 mb-4">
      <div className="card">
        <Link to={`/scholarships/schp?id=${props.id}`} className="link">
          <img
            className="card-img-top"
            src={props.img_src}
            style={{ objectFit: "cover", height: "300px" }}
            alt={`A logo/icon of the scholarship ${props.name}.`}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title" style={{ paddingBottom: "4px" }}>
            <Link to={`/scholarships/schp?id=${props.id}`} className="link">
              <b>{props.name}</b>
            </Link>
          </h5>
          <p className="card-text">
            <b>Award by:</b> {props.awarded_by}
          </p>
          <p className="card-text">
            <b>Award Amount:</b> {props.award_amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="card-text">
            <b>Nationwide:</b> {props.nationwide ? "Yes" : "No"}
          </p>
          <p className="card-text">
            <b>Need-based:</b> {props.need_based ? "Yes" : "No"}
          </p>
          <p className="card-text">
            <b>Merit-based:</b> {props.merit_based ? "Yes" : "No"}
          </p>
          <p className="card-text">
            <b>Essay Required:</b> {props.essay_based ? "Yes" : "No"}
          </p>
          <p className="card-text">
            <Link to={`/scholarships/schp?id=${props.id}`} className="link">Learn More </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsCard;
