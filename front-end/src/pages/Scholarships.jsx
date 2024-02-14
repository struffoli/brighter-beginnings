import React from "react";
import ScholarshipsCard from "../components/cards/ScholarshipsCard";
import { scholarshipsData } from "../data/scholarships";

const Scholarships = () => {
  return (
    <div>
      <h2 style={{ padding: "1%", marginLeft: "0.5%" }}>Scholarships</h2>
      <div className="row justify-content-center mb-5 mx-2">
        {scholarshipsData.map((scholarship, index) => (
          <ScholarshipsCard
            key={index}
            // img_src={scholarship.img_src}
            name={scholarship.name}
            donor={scholarship.donor}
            area={scholarship.area}
            ageGroup={scholarship.ageGroup}
            award={scholarship.award}
            people={scholarship.people}
            description={scholarship.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Scholarships;
