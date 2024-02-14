import React from "react";

const StatsCard = (props) => {
  return (
    <div key={props.index} className="col-md-4 mb-4">
      <div className="card">
        <img
          className="card-img-top"
          src={props.img_src}
          style={{ objectFit: "cover", height: "300px" }}
        />
        <div className="card-body">
          <h5 className="card-title" style={{ marginBottom: "3%" }}>
            {props.name}
          </h5>
          <p className="card-text">Role: {props.role}</p>
          <p className="card-text">{props.description}</p>
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
