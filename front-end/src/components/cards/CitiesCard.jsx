import React from "react";

const CitiesCard = (props) => {
  return (
    <div key={props.index} className="col-md-4 mb-4">
      <div className="card">
        <img className="card-img-top" src={props.img_src} style={{ objectFit: "cover", height: "300px" }} />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Population: {props.population}</p>
          <p className="card-text">Number of Schools: {props.numSchools}</p>
          <p className="card-text">Average SAT: {props.testScore}</p>
          <p className="card-text">Median Income: {props.medianIncome}</p>
          <p className="card-text">Percent Unemployment: {props.percentUnemployment}%</p>
          <p className="card-text">Percent of Students on Free and Reduced Lunch: {props.freeLunch}%</p>
          <p className="card-text">Percent of Adults College Educated {props.educated}%</p>
          <ul className="list-group list-group-flush">
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CitiesCard;
