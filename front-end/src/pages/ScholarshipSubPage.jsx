import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
// import { scholarships } from "../data/scholarships";
import { getScholarshipById } from "./Scholarships";

function ScholarshipsSubPage() {
  const [queryParameters] = useSearchParams();

  // const getScholarship = (query) => {
  //   return scholarships.find((s) => s.id === query); //find in the data
  // };

  // const scholarship_id = parseInt(queryParameters.get("id"));
  // const scholarship = getScholarship(scholarship_id);

  const scholarship_id = queryParameters.get("id");
  const [scholarship, setApiScholarship] = useState();
  useEffect(() => {
    getScholarshipById(scholarship_id).then((data) => setApiScholarship(data));
  }, [scholarship_id]);

  if (scholarship) {
    return (
      <div className="container" style={{ marginTop: "3%" }}>
        <div className="row justify-content-center">
          <img
            className=""
            src={scholarship.Scholarship.img_src}
            style={{ height: "30%", width: "30%" }}
            alt="Scholarship"
          />
        </div>
        <div className="">
          <h5 className="" style={{ paddingBottom: "4px" }}>
            {scholarship.Scholarship.name}
          </h5>
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
    );
  }
}

export default ScholarshipsSubPage;
