import React from "react";

const CitiesCard = (props) => {
  return (
    <div key={props.index} className="col-md-4 mb-4">
      <div className="card">
        <img
          className="card-img-top"
          src={props.img_src}
          style={{ objectFit: "cover", height: "300px" }}
        />
        <div className="card-body">
          <h5 className="card-title" style={{ paddingBottom: "4px" }}>
            <b>{props.name}</b>
          </h5>
          <p className="card-text">
            <b>Population:</b> {props.population}
          </p>
          <p className="card-text">
            <b>Number of Schools:</b> {props.numSchools}
          </p>
          <p className="card-text">
            <b>Average SAT:</b> {props.testScore}
          </p>
          <p className="card-text">
            <b>Median Income:</b> {props.medianIncome}
          </p>
          <p className="card-text">
            <b>Percent Unemployment:</b> {props.percentUnemployment}%
          </p>
          <p className="card-text">
            <b>Percent of Students on Free/Reduced Lunch:</b> {props.freeLunch}%
          </p>
          <p className="card-text">
            <b>Percent of Adults College Educated:</b> {props.educated}%
          </p>
          <ul className="list-group list-group-flush"></ul>
        </div>
      </div>
    </div>
  );
};

export default CitiesCard;
