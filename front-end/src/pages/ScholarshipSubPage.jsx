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

  console.log(scholarship)

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
            <b>Award by:</b> {scholarship.Scholarship.awarded_by}
          </p>
          <p className="card-text">
            <b>Award Amount:</b> {scholarship.Scholarship.award_amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="card-text">
            <b>Nationwide:</b> {scholarship.Scholarship.nationwide ? "Yes" : "No"}
          </p>
          <p className="card-text">
            <b>Need-based:</b> {scholarship.Scholarship.need_based ? "Yes" : "No"}
          </p>
          <p className="card-text">
            <b>Merit-based:</b> {scholarship.Scholarship.merit_based ? "Yes" : "No"}
          </p>
          <p className="card-text">
            <b>Essay Required:</b> {scholarship.Scholarship.essay_based ? "Yes" : "No"}
          </p>
          <p className="">
            <b>Eligible for students from: </b>
            {/* show "many cities" if scholarship has blank city field */}
            {scholarship.city !== "" ? (
              <Link to={`/cities/city?name=${scholarship.city}`} className="link">
                {scholarship.city}
              </Link>
            ) : (
              `Many Cities`
            )}
          </p>
          <p className="">
            <Link to={scholarship.link}>
              <b>Link to Apply</b>
            </Link>
          </p>
          <ul className="list-group list-group-flush"></ul>
        </div>
      </div>
    );
  }
}

export default ScholarshipsSubPage;
