import React from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';


const ExploreCard = (props) => {
  return (
    <div key={props.name} className="col-md-4 mb-4">
      <div className="card">
        <Nav.Link href={`/${props.name.toLowerCase()}`} class>
          <img
            className="card-img pt-2 px-2"
            src={props.img_src}
            style={{ objectFit: "contain", height: "200px" }}
            alt={`An icon representing ${props.name}.`}
          />
        </Nav.Link>
        <div className="card-body">
          <Nav.Link href={`/${props.name.toLowerCase()}`}>
            <h4
              className="card-title text-center text-decoration-none"
              style={{
                marginBottom: "3%",
                color: "black",
              }}
            >
              <b>{props.name}</b>
            </h4>
          </Nav.Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
