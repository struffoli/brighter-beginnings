import React from "react";
import "./ToolsCard.css";
import Card from "react-bootstrap/Card";

const ToolsCard = (props) => {
  return (
    <Card key={props.index} className="col-md-2 mb-4 mx-2">
      <img
        className="card-img-top pt-2 px-2"
        src={props.img_src}
        style={{ objectFit: "contain", height: "200px" }}
        alt={`A logo/icon of the tool ${props.name}.`}
      />
      <div className="card-body">
        <h4 className="card-title-tool text-center">
          <p>
            <b>{props.name}</b>
          </p>
        </h4>
        <h4 className="card-description-tool text-center">
          <p>{props.description}</p>
        </h4>
      </div>
    </Card>
  );
};

export default ToolsCard;
