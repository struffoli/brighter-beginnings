import React from 'react';
import ScholarshipsCard from "../components/cards/ScholarshipsCard";
import {scholarshipsData} from "../data/scholarships";

const Scholarships = () => {
    return (
        <div>
            <h2>Scholarships</h2>
            <div className="row">
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
