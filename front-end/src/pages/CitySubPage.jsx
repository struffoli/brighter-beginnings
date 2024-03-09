import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { cities } from "../data/cities.js";
// import { organizations } from "../data/organizations.js";
// import { scholarships } from "../data/scholarships.js";
import { getCityById } from "./Cities.jsx";
import { getScholarshipById } from "./Scholarships.jsx";

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
  }, [city_id]);
  // get scholarship to get org connections
  const [scholarship, setApiScholarship] = useState();
  if (city) {
    const scholarship_id = city.City.scholarships[0].id;
    getScholarshipById(scholarship_id).then((data) => setApiScholarship(data));
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
                title="google map of this page's city"
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
              <p className="">
                <b>Scholarship: </b>
                <NavLink to={`/scholarships/schp?id=${scholarship_id}`}>
                  {city.City.scholarships[0].name}
                </NavLink>
              </p>
              <p className="card-text">
                <b>Relevant Organizations: </b>
              </p>
              {scholarship ? scholarship.Scholarship.organizations.map((org, index) => (
                <p>
                  <NavLink to={`/organizations/org?id=${org.id}`} key={index}>
                    {org.name}
                  </NavLink>
                </p>
              )) : <p>Loading...</p>}
              <ul className="list-group list-group-flush"></ul>
            </div>
          </div>
        </div>
      );
    }
 
}

export default CitySubPage;
