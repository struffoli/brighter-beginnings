import React from 'react';
import OrganizationsCard from "../components/cards/OrganizationsCard";

const Organizations = () => {
    const organizations = [
        {
            // img_src: "path_to_org_image1.jpg",
            name: "Helping Hands",
            location: "123 Charity St, Springfield",
            distance: "5 miles",
            contactInfo: "555-0101",
            organizationType: "Non-profit"
        },
        {
            // img_src: "path_to_org_image2.jpg",
            name: "Education for All",
            location: "456 Learning Ave, Riverdale",
            distance: "10 miles",
            contactInfo: "555-0202",
            organizationType: "Educational"
        }
    ];

    return (
        <div>
            <h2>Organizations</h2>
            <div className="row">
                {organizations.map((org, index) => (
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
