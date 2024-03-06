import React from "react";


const ToolsCard = (props) => {
  return (
    <div key={props.index} className="col-md-2 mb-4">
      <div className="card">
        <img
          className="card-img-top pt-2 px-2"
          src={props.img_src}
          style={{ objectFit: "contain", height: "200px" }}
          alt={`A logo/icon of the tool ${props.name}.`}
        />
        <div className="card-body">
          <h4 className="card-title text-center" style={{ marginBottom: "3%" }}>
            <b>{props.name}</b>
          </h4>
          <p>
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolsCard;
