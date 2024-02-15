import React from "react";

const ExploreCard = (props) => {
  return (
    <div key={props.name} className="d-flex flex-row col-md-2 mb-4">
      <div className="card">
        <img
          className="card-img pt-2 px-2"
          src={props.img_src}
          style={{ objectFit: "contain", height: "200px" }}
          alt={`An icon representing ${props.name}.`}
        />
        <div className="card-body">
          <h4 className="card-title text-center" style={{ marginBottom: "3%" }}>
            <b>{props.name}</b>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
