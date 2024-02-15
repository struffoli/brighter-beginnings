import { React } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { scholarships } from "../data/scholarships";

function ScholarshipsSubPage() {
  const [queryParameters] = useSearchParams();

  const getScholarship = (query) => {
    return scholarships.find((s) => s.name === query);
  };

  const scholarship_name = queryParameters.get("name");
  const scholarship = getScholarship(scholarship_name);

  return (
    <div className="container" style={{ marginTop: "3%" }}>
      <div className="row justify-content-center">
        <img
          className=""
          src={scholarship.img_src}
          style={{ height: "30%", width: "30%" }}
          alt="Scholarship"
        />
      </div>
      <div className="">
        <h5 className="" style={{ paddingBottom: "4px" }}>
          {scholarship.name}
        </h5>
        <p className="">
          <b>Donor:</b> {scholarship.donor}
        </p>
        <p className="">
          <b>Awarded by: </b>
          <Link
            to={`/organizations/org?name=${scholarship.organization}`}
            className="link"
          >
            {scholarship.organization}
          </Link>
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
          <b>Area:</b> {scholarship.area}
        </p>
        <p className="">
          <b>Age Group:</b> {scholarship.ageGroup}
        </p>
        <p className="">
          <b>Award:</b> {scholarship.award}
        </p>
        <p className="">
          <b>Number of Recipients:</b> {scholarship.recipients}
        </p>
        <p className="">
          <b>Description:</b> {scholarship.description}
        </p>
        <ul className="list-group list-group-flush"></ul>
      </div>
    </div>
  );
}

export default ScholarshipsSubPage;
