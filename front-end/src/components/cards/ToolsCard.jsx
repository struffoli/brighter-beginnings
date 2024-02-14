import React from "react";
import { Link } from "react-router-dom";

const ToolsCard = (props) => {
  return (
    <div key={props.index} className="col-md-2 mb-4">
      <div className="card">
        <img
          className="card-img-top"
          src={props.img_src}
          style={{ objectFit: "contain", height: "200px" }}
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

export default ToolsCard;
