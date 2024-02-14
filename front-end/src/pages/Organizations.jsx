import React from "react";
import OrganizationsCard from "../components/cards/OrganizationsCard";
import { organizationsData } from "../data/organizations";

const Organizations = () => {
  return (
    <div>
      <h2 style={{ padding: "1%", marginLeft: "0.5%" }}>Organizations</h2>
      <div className="row justify-content-center mb-5 mx-2">
        {organizationsData.map((org, index) => (
          <OrganizationsCard
            key={index}
            // img_src={org.img_src}
            name={org.name}
            location={org.location}
            distance={org.distance}
            contactInfo={org.contactInfo}
            organizationType={org.organizationType}
          />
        ))}
      </div>
    </div>
  );
};

export default Organizations;
