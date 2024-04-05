import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
// import { scholarships } from "../data/scholarships";
import { getScholarshipById } from "./Scholarships";
import states from "../data/states";
import { getCityById } from "./Cities";

function ScholarshipsSubPage() {
  const [queryParameters] = useSearchParams();

  // const getScholarship = (query) => {
  //   return scholarships.find((s) => s.id === query); //find in the data
  // };

  // const scholarship_id = parseInt(queryParameters.get("id"));
  // const scholarship = getScholarship(scholarship_id);

  const [cities, setApiCities] = useState([]);
  const scholarship_id = queryParameters.get("id");
  const [scholarship, setApiScholarship] = useState();
  useEffect(() => {
    getScholarshipById(scholarship_id).then((data) => {
      setApiScholarship(data);
      console.log(data);
      if (cities.length === 0) {
        data.Scholarship.cities.map((city, index) =>
          getCityById(city.id).then((data) => {
            setApiCities((prevCities) => [...prevCities, data]);
          })
        );
      }
    });
  }, [scholarship_id, cities]);

  console.log(cities);

  // console.log(scholarship);

  // const [cities, setApiCities] = useState([]);
  // useEffect(() => {
  //   scholarship.Scholarship.cities.map((city, index) =>
  //     getCityById(city.id).then((data) => setApiCities([...cities, data]))
  //   );
  // }, [cities, scholarship.Scholarship.cities]);

  // console.log(cities);

  if (scholarship) {
    console.log(scholarship.Scholarship.nationwide);
    return (
      <div className="container" style={{ marginTop: "3%" }}>
        <div className="d-flex justify-content-around">
          <div className="w-100">
            <img
              className="mb-4"
              src={scholarship.Scholarship.img_src}
              style={{ height: "29.5rem", width: "100%", objectFit: "cover" }}
              alt="Scholarship"
            />
            {scholarship.Scholarship.nationwide ? (
              <img
                className="w-50"
                src={states["United States of America"].flag}
                style={{ objectFit: "cover", width: "100%" }}
                alt={`The flag of the USA.`}
              />
            ) : (
              cities
                .slice(0, 3)
                .map((city, index) => (
                  <img
                    className="w-25 mx-4"
                    src={states[city.City.state].flag}
                    style={{ objectFit: "cover" }}
                    alt={`The flag of ${city.City.name}.`}
                  />
                ))
            )}
          </div>
          <div className="px-5 w-100">
            <h3 className="" style={{ paddingBottom: "4px" }}>
              <b>{scholarship.Scholarship.name}</b>
            </h3>
            <p className="card-text">
              <Link
                to={scholarship.Scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <b>Link to Apply</b>
              </Link>
            </p>
            <p className="card-text">
              <b>Award by:</b> {scholarship.Scholarship.awarded_by}
            </p>
            <p className="card-text">
              <b>Award Amount:</b>{" "}
              {scholarship.Scholarship.award_amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p className="card-text">
              <b>Nationwide:</b>{" "}
              {scholarship.Scholarship.nationwide ? "Yes" : "No"}
            </p>
            <p className="card-text">
              <b>Need-based:</b>{" "}
              {scholarship.Scholarship.need_based ? "Yes" : "No"}
            </p>
            <p className="card-text">
              <b>Merit-based:</b>{" "}
              {scholarship.Scholarship.merit_based ? "Yes" : "No"}
            </p>
            <p className="card-text">
              <b>Essay Required:</b>{" "}
              {scholarship.Scholarship.essay_based ? "Yes" : "No"}
            </p>
            <p className="card-text">
              <b>Eligible for students from: </b>
            </p>
            {scholarship.Scholarship.cities.map((city, index) => (
              <p>
                <Link to={`/cities/city?id=${city.id}`} key={index}>
                  {city.name}
                </Link>
              </p>
            ))}
            <p className="card-text">
              <b>Relevant Organizations: </b>
            </p>
            {scholarship.Scholarship.organizations.map((org, index) => (
              <p>
                <Link to={`/organizations/org?id=${org.id}`} key={index}>
                  {org.name}
                </Link>
              </p>
            ))}
            <ul className="list-group list-group-flush"></ul>
          </div>
        </div>
      </div>
      // <div className="container" style={{ marginTop: "3%" }}>
      //   <div className="row justify-content-center">

      //   </div>
      //   <div className="">
      //     <h5 className="" style={{ paddingBottom: "4px" }}>
      //       {scholarship.Scholarship.name}
      //     </h5>

      //     <ul className="list-group list-group-flush"></ul>
      //   </div>
      // </div>
    );
  }
}

export default ScholarshipsSubPage;
