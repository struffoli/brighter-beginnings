import React from "react";
import { Link } from "react-router-dom";
import states from "../../data/states";
import HighlightedText from "../HighlightedText";

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
          <div className="d-flex flex-row justify-content-between">
            <h5 className="card-title" style={{ paddingBottom: "4px" }}>
              <Link to={`/cities/city?id=${props.id}`} className="link">
                <b>
                  <HighlightedText
                    searchText={props.searchText}
                    text={
                      props.name + ", " + states[props.state]["abbreviation"]
                    }
                  />
                </b>
              </Link>
            </h5>
            <img
              className=""
              src={states[props.state].flag}
              style={{ objectFit: "cover", width: "15%" }}
              alt={`The flag of ${props.state}.`}
            />
          </div>
          {/* <p className="card-text">
            <b>State:</b> {props.state}
          </p> */}
          <p className="card-text">
            <b>Population:</b> {props.population}
          </p>
          <p className="card-text">
            <b>Median Income:</b> {props.median_income}
          </p>
          <p className="card-text">
            <b>Unemployment Rate:</b> {(props.unemployment_rate * 100).toFixed(2)}%
          </p>
          <p className="card-text">
            <b>Poverty Rate:</b> {(props.poverty_rate * 100).toFixed(2)}%
          </p>
          <p className="card-text">
            <b>College Educated Rate:</b> {(props.college_educated_rate * 100).toFixed(2)}%
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
