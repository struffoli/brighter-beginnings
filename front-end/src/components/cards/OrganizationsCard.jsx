import React from "react";

const OrganizationsCard = (props) => {
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
          <p className="card-text">{props.location}</p>
          <p className="card-text">{props.distance}</p>
          <p className="card-text">{props.contactInfo}</p>
          <p className="card-text">{props.organizationType}</p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsCard;
