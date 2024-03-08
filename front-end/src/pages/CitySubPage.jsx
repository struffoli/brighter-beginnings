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
        <div className="d-flex justify-content-around">
          <img
            className=""
            src={city.City.img_src}
            style={{ height: "29.5rem", width: "50%", objectFit: "cover" }}
            alt="City"
          />
          <div className="px-5 w-100">
            <h3 className="" style={{ paddingBottom: "4px" }}>
              <b>{city.City.name}</b>
            </h3>
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
            <iframe
              className="my-3"
              width="100%"
              height="53%"
              style={{ border: 0 }}
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              src={
                "https://www.google.com/maps/embed/v1/place?key=AIzaSyCN-0OitT1TAcITWdYcLeHnqGgqbA9eriQ&q=" +
                city.City.name +
                ", " +
                city.City.state +
                ", USA"
              }
            ></iframe>
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
      </div>
    );
  }
}

export default CitySubPage;
