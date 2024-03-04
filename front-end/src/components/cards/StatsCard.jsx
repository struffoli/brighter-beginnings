import React from "react";
import { Link } from "react-router-dom";

const StatsCard = (props) => {
  return (
    <div key={props.index} className="col-md-4 mb-4">
      <div className="card">
        <Link to={`/about/dev?name=${props.name}`} className="link">
          <img
            className="card-img-top"
            src={props.img_src}
            style={{ objectFit: "cover", height: "300px" }}
            alt={`${props.name}'s face. How cool!`}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title" style={{ marginBottom: "3%" }}>
            <Link to={`/about/dev?name=${props.name}`} className="link">
              {props.name}
            </Link>
          </h5>
          <p className="card-text">Role: {props.role}</p>
          <p className="card-text">
            <i>{props.description}</i>
          </p>
          <ul
            className="list-group list-group-flush"
            style={{ marginLeft: "3%" }}
          >
            <li>Commits: {props.numCommits}</li>
            <li>Issues closed: {props.numIssues}</li>
            <li>Unit Tests: {props.tests}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
