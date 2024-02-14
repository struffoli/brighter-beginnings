import React from "react";
import ScholarshipsCard from "../components/cards/ScholarshipsCard";
import { scholarships } from "../data/scholarships";

const Scholarships = () => {
  return (
    <div>
      <h2 className="mx-4 my-4 px-2">
        <b>Scholarships</b>
      </h2>
      <div className="row justify-content-center mb-5 mx-4">
        {scholarships.map((scholarship, index) => (
          <ScholarshipsCard
            key={index}
            img_src={scholarship.img_src}
            name={scholarship.name}
            donor={scholarship.donor}
            area={scholarship.area}
            ageGroup={scholarship.ageGroup}
            award={scholarship.award}
            recipients={scholarship.recipients}
            description={scholarship.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Scholarships;
