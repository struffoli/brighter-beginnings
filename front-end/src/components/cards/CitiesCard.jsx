import React from "react";
import { Link } from "react-router-dom";

const CitiesCard = (props) => {
  return (
    <div key={props.index} className="col-md-4 mb-4">
      <div className="card">
        <Link to={`/cities/city?id=${props.id}`} className="link">
          <img
            className="card-img-top"
            src={props.img_src}
            style={{ objectFit: "cover", height: "300px" }}
            alt={`An scenic view of the city of ${props.name}.`}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title" style={{ paddingBottom: "4px" }}>
            <Link to={`/cities/city?id=${props.id}`} className="link">
              <b>{props.name}</b>
            </Link>
          </h5>
          <p className="card-text">
            <b>State:</b> {props.state}
          </p>
          <p className="card-text">
            <b>Population:</b> {props.population}
          </p>
          <p>
            <Link to={`/cities/city?id=${props.id}`} className="link">
              Click here to see organizations/scholarships!
            </Link>
          </p>
          <ul className="list-group list-group-flush"></ul>
        </div>
      </div>
    </div>
  );
};

export default CitiesCard;
