import React from 'react';
import ScholarshipsCard from "../components/cards/ScholarshipsCard";

const Scholarships = () => {
    const scholarships = [
        {
            // img_src: "path_to_scholarship_image1.jpg",
            name: "Future Leaders Scholarship",
            donor: "Tech Innovators Inc.",
            area: "Technology",
            ageGroup: "18-24",
            award: "$5000",
            people: 10,
            description: "For aspiring tech leaders"
        },
        {
            // img_src: "path_to_scholarship_image2.jpg",
            name: "Artists of Tomorrow Award",
            donor: "Creative Minds Foundation",
            area: "Arts",
            ageGroup: "18-30",
            award: "$3000",
            people: 5,
            description: "For emerging artists"
        }
    ];

    return (
        <div>
            <h2>Scholarships</h2>
            <div className="row">
                {scholarships.map((scholarship, index) => (
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
