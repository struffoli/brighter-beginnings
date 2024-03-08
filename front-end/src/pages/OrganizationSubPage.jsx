import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
// import { organizations } from "../data/organizations";
// import { scholarships } from "../data/scholarships";
import { getOrganizationById } from "./Organizations";

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

  if (org) {
    return (
      <div className="container" style={{ marginTop: "3%" }}>
        <div className="row justify-content-center">
          <img
            className=""
            src={org.Organization.img_src}
            style={{ height: "30%", width: "30%" }}
            alt="Org"
          />
        </div>
        <div className="">
          <h5 className="" style={{ paddingBottom: "4px" }}>
            {org.Organization.name}
          </h5>
          <p className="card-text">
              <b>Org Number:</b> {org.Organization.id}
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
          {/* <p className="">
            <b>City: </b>
            <Link to={`/cities/city?name=${org.Organization.city}`} className="link">
              {org.city}
            </Link>
          </p> */}
          {/* only display if this organization has scholarships */}
          {/* {org.scholarships.length > 0 ? (
            <p className="">
              <b>Scholarships:</b>
              {org.scholarships.map((scholarship) => {
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
          <div className="row justify-content-left">
          {/* <h5> Location Map </h5>
          <img
              className=""
              src={org.locationPic}
              style={{ height: "30%", width: "30%" }}
              alt="Organization Location"
          >

          </img> */}
        </div>
        </div>
      </div>
    );
  }
}

export default OrganizationSubPage;
