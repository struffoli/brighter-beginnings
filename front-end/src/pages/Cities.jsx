import React from 'react';
import CitiesCard from "../components/cards/CitiesCard";

const Cities = () => {
    const cities = [
        {
            // img_src: "path_to_image_city1.jpg",
            name: "Austin",
            population: "964,177",
            numSchools: 125,
            testScore: "1150",
            medianIncome: "$45,000",
            percentUnemployment: 4,
            freeLunch: 35,
            educated: 55
        },
        {
            // img_src: "path_to_image_city2.jpg",
            name: "San Francisco",
            population: "815,201",
            numSchools: 113,
            testScore: "1100",
            medianIncome: "$40,000",
            percentUnemployment: 6,
            freeLunch: 40,
            educated: 50
        },
        {
            // img_src: "path_to_image_city3.jpg",
            name: "Miami",
            population: "439,890",
            numSchools: 522,
            testScore: "1180",
            medianIncome: "$48,000",
            percentUnemployment: 5,
            freeLunch: 32,
            educated: 58
        }
    ];

    return (
        <div>
            <h2>Cities</h2>
            <div className="row">
                {cities.map((city, index) => (
                    <CitiesCard 
                        key={index}
                        // img_src={city.img_src}
                        name={city.name}
                        population={city.population}
                        numSchools={city.numSchools}
                        testScore={city.testScore}
                        medianIncome={city.medianIncome}
                        percentUnemployment={city.percentUnemployment}
                        freeLunch={city.freeLunch}
                        educated={city.educated}
                    />
                ))}
            </div>
        </div>
    );
};

export default Cities;
