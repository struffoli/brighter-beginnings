import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { organizations } from "../data/organizations";
// import { scholarships } from "../data/scholarships";
import { getOrganizationById } from "./Organizations";
import { getScholarshipById } from "./Scholarships";

function OrganizationSubPage() {
  const [queryParameters] = useSearchParams();

  // const getOrg = (query) => {
  //   return organizations.find((o) => o.id === query); //find in the data
  // };

  // const org_id = parseInt(queryParameters.get("id"));
  // const org = getOrg(org_id);

  const org_id = queryParameters.get("id");
  const [org, setApiOrg] = useState();
  useEffect(() => {
    getOrganizationById(org_id).then((data) => setApiOrg(data));
  }, [org_id]);

  const [scholarship, setApiScholarship] = useState();
  if (org) {
    const scholarship_id = org.Organization.scholarship.id;
    getScholarshipById(scholarship_id).then((data) => setApiScholarship(data));
    return (
      <div className="container" style={{ marginTop: "3%" }}>
        <div className="d-flex justify-content-around">
          <img
            className=""
            src={org.Organization.img_src}
            style={{ height: "29.5rem", width: "50%", objectFit: "cover" }}
            alt="Org"
          />
          <div className="px-5 w-100">
            <h3 className="" style={{ paddingBottom: "4px" }}>
              <b>{org.Organization.name}</b>
            </h3>
            <p className="card-text">
              <b>Address:</b> {org.Organization.address}
            </p>
            <p className="card-text">
              <b>Email:</b> {org.Organization.email}
            </p>
            <p className="card-text">
              <b>Phone:</b> {org.Organization.phone}
            </p>
            <p className="card-text">
              <b>Organization Type:</b> {org.Organization.organization_type}
            </p>
            <iframe
              title="google map of this page's organization"
              className="my-3"
              width="100%"
              height="53%"
              style={{ border: 0 }}
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              src={
                "https://www.google.com/maps/embed/v1/place?key=AIzaSyCN-0OitT1TAcITWdYcLeHnqGgqbA9eriQ&q=" +
                (org.Organization.address
                  ? org.Organization.address
                  : "United States")
              }
            ></iframe>
            <p className="">
              <b>Scholarship: </b>
              <Link
                to={`/scholarships/schp?id=${org.Organization.scholarship_id}`}
              >
                {org.Organization.scholarship.name}
              </Link>
            </p>
            <p className="card-text">
              <b>Cities: </b>
            </p>
            {scholarship ? (
              scholarship.Scholarship.cities.map((city, index) => (
                <p>
                  <NavLink to={`/cities/city?id=${city.id}`} key={index}>
                    {city.name}
                  </NavLink>
                </p>
              ))
            ) : (
              <p>Loading...</p>
            )}
            <ul className="list-group list-group-flush"></ul>
          </div>
        </div>
      </div>
      // <div className="container" style={{ marginTop: "3%" }}>
      //   <div className="row justify-content-center">
      //
      //   </div>
      //   <div className="">
      //
      //
      //     <p className="">
      //       <b>Scholarship: </b>
      //       <Link to={`/scholarships/schp?id=${org.Organization.scholarship_id}`}>
      //         {org.Organization.scholarship.name}
      //       </Link>
      //     </p>
      //     <p className="card-text">
      //       <b>Cities: </b>
      //     </p>
      //     {scholarship ? scholarship.Scholarship.cities.map((city, index) => (
      //       <p>
      //         <NavLink to={`/cities/city?id=${city.id}`} key={index}>
      //           {city.name}
      //         </NavLink>
      //       </p>
      //     )) : <p>Loading...</p>}
      //   </div>
      // </div>
    );
  }
}

export default OrganizationSubPage;
