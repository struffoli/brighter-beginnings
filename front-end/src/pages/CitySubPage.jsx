import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
// import { cities } from "../data/cities.js";
// import { organizations } from "../data/organizations.js";
// import { scholarships } from "../data/scholarships.js";
import { getCityById } from "./Cities.jsx";

function CitySubPage() {
  const [queryParameters] = useSearchParams();

  // const getCity = (query) => {
  // return cities.find((c) => c.id === query); //find in the data
  // }; 

  const city_id = queryParameters.get("id");
  // const city = getCity(city_id);
  const [city, setApiCity] = useState();
  useEffect(() => {
    getCityById(city_id).then((data) => setApiCity(data));
  }, []);

  if (city) {
    return (
      <div className="container" style={{ marginTop: "3%" }}>
        <div className="row justify-content-center">
          <img
            className=""
            src={city.City.img_src}
            style={{ height: "50%", width: "50%" }}
            alt="City"
          />
        </div>
        <div className="">
          <h5 className="" style={{ paddingBottom: "4px" }}>
            {city.City.name}
          </h5>
          <p className="">
            <b>Population:</b> {city.City.population}
          </p>
          <p className="card-text">
            <b>Median Income:</b> {city.City.median_income}
          </p>
          <p className="card-text">
            <b>Unemployment Rate:</b> {city.City.unemployment_rate}%
          </p>
          <p className="card-text">
            <b>Poverty Rate:</b> {city.City.poverty_rate}%
          </p>
          {/* only display if this city has organizations */}
          {/* {city.organizations.length > 0 ? (
            <p className="">
              <b>Organizations:</b>
              {city.organizations.map((organization) => {
                const org = organizations.find((o) => o.name === organization);
                return (
                  <p>
                    <Link
                      to={`/organizations/org?id=${org.id}`}
                      className="link"
                    >
                      {org.name}
                    </Link>
                  </p>
                );
              })}
            </p>
          ) : (
            <></>
          )} }
          {/* only display if this city has scholarships */}
          {/* {city.scholarships.length > 0 ? (
            <p className="">
              <b>Scholarships:</b>
              {city.scholarships.map((scholarship) => {
                const schp = scholarships.find(
                  (schp) => schp.name === scholarship
                );
                return (
                  <p>
                    <Link
                      to={`/scholarships/schp?id=${schp.id}`}
                      className="link"
                    >
                      {schp.name}
                    </Link>
                  </p>
                );
              })}
            </p>
          ) : (
            <></>
          )} */}
          <ul className="list-group list-group-flush"></ul>
        </div>
      </div>
    );
  }
}

export default CitySubPage;
