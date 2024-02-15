import { React } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { organizations } from "../data/organizations";
import { scholarships } from "../data/scholarships";

function OrganizationSubPage() {
  const [queryParameters] = useSearchParams();

  const getOrg = (query) => {
    return organizations.find((o) => o.name === query);
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
            {org.city}
          </Link>
        </p>
        <p className="">
          <b>Contact Info:</b> {org.contactInfo}
        </p>
        <p className="">
          <b>Organization Type:</b> {org.organizationType}
        </p>
        {/* only display if this organization has scholarships */}
        {org.scholarships.length > 0 ? (
          <p className="">
            <b>Scholarships:</b>
            {org.scholarships.map((scholarship) => {
              const schp = scholarships.find(
                (schp) => schp.name === scholarship
              );
              return (
                <p>
                  <Link
                    to={`/scholarships/schp?name=${schp.name}`}
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
        )}
        <ul className="list-group list-group-flush"></ul>
      </div>
    </div>
  );
}

export default OrganizationSubPage;
