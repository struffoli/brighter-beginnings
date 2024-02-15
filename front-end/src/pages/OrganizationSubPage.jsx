import { React }from "react";
import { useSearchParams, Link } from "react-router-dom";
import { organizations } from "../data/organizations";

function OrganizationSubPage() {
  const [queryParameters] = useSearchParams();

  const getOrg = (query) => {
    return organizations.find(o => o.name === query);
  };

  const org_name = queryParameters.get("name");
  const org = getOrg(org_name);
  
  return (
    <div className="container" style={{ marginTop: "3%" }}>
      <div className="row justify-content-center">

        <img
          className=""
          src={org.img_src}
          style={{ height: "30%", width: "30%" }}
          alt="Org"
        />
      </div>
      <div className="">
        <h5 className="" style={{ paddingBottom: "4px" }}>
          {org.name}
        </h5>
        <p className="">
          <b>Location:</b> {org.location}
        </p>
        <p className="">
          <b>City: </b>
          <Link to={`/cities/city?name=${org.city}`} className="link">
            <b>{org.city}</b>
          </Link>
        </p>
        <p className="">
          <b>Contact Info:</b> {org.contactInfo}
        </p>
        <p className="">
          <b>Organization Type:</b> {org.organizationType}
        </p>
        <p className="">
          <Link to={`/scholarships/schp?name=${org.scholarship}`} className="link">
            <b>Click here to see scholarships!</b>
          </Link>
        </p>
        <ul className="list-group list-group-flush"></ul>
      </div>
    </div>
  );
}

export default OrganizationSubPage;
