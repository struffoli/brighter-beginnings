import React from "react";
import OrganizationsCard from "../components/cards/OrganizationsCard";
import { organizations } from "../data/organizations";

const Organizations = () => {
  return (
    <div>
      <h2 className="mx-4 my-4 px-2">
        <b>Organizations</b>
      </h2>
      <div className="row justify-content-center mb-5 mx-4">
        {organizations.map((org, index) => (
          <OrganizationsCard
            key={index}
            img_src={org.img_src}
            name={org.name}
            id={org.id}
            location={org.location}
            city={org.city}
            description={org.description}
            contactInfo={org.contactInfo}
            organizationType={org.organizationType}
            scholarship={org.scholarship}
          />
        ))}
      </div>
    </div>
  );
};

export default Organizations;
