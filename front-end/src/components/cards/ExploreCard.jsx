import React from "react";
import { Link } from "react-router-dom";

const ExploreCard = (props) => {
  return (
    <div key={props.name} className="col-md-4 mb-4">
      <div className="card">
        <Link to={`/${props.name.toLowerCase()}`} className="link">
          <img
            className="card-img pt-2 px-2"
            src={props.img_src}
            style={{ objectFit: "contain", height: "200px" }}
            alt={`An icon representing ${props.name}.`}
          />
        </Link>
        <div className="card-body">
          <Link to={`/${props.name.toLowerCase()}`} className="link">
            <h4
              className="card-title text-center text-decoration-none"
              style={{
                marginBottom: "3%",
                color: "black",
              }}
            >
              <b>{props.name}</b>
            </h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
