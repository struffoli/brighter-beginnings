import React from "react";

const OrganizationsCard = (props) => {
  return (
    <div key={props.index} className="col-md-4 mb-4">
      <div className="card">
        <img className="card-img-top" src={props.img_src} style={{ objectFit: "cover", height: "300px" }} />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Awarded By: {props.donor}</p>
          <p className="card-text">Area: {props.area}</p>
          <p className="card-text">Age Group: {props.ageGroup}</p>
          <p className="card-text">Award: {props.award}</p>
          <p className="card-text">Number of Recipients: {props.people}</p>
          <p className="card-text">Requirements: {props.description}</p>

          <ul className="list-group list-group-flush">
            <li>Commits: {props.numCommits}</li>
            <li>Issues: {props.numIssues}</li>
            <li>Unit Tests: {props.tests}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
