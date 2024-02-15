import { React } from "react";
import { useSearchParams } from "react-router-dom";
import { scholarships } from "../data/scholarships";
import { cities } from "../data/cities";

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
          <b>Awarded By:</b> {scholarship.donor}
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
        {scholarship.cities.length > 0 ? (
          <p className="">
            <b>Cities:</b>
            {scholarship.cities.map((cty) => {
              const city = cities.find((city) => city.name === cty);
              return (
                <p>
                  <a href={`/cities/city?name=${city.name}`}>{city.name}</a>
                </p>
              );
            })}
          </p>
        ) : (
          <></>
        )}
        {scholarship.organization !== "" ? (
          <p className="">
            <b>Organization:</b>
            <p>
              <a href={`/organizations/org?name=${scholarship.organization}`}>
                {scholarship.organization}
              </a>
            </p>
          </p>
        ) : (
          <></>
        )}
        <ul className="list-group list-group-flush"></ul>
      </div>
    </div>
  );
}

export default ScholarshipsSubPage;
