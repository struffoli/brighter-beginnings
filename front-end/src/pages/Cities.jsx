import React from "react";
import CitiesCard from "../components/cards/CitiesCard";
import { cities } from "../data/cities.js"; // Importing cities data
import mapPage from "../assets/maptemp.png";

const Cities = () => {
  return (
    <div>
      <h2 className="mx-4 my-4 px-2">
        <b>Cities</b>
      </h2>
      <div className="row justify-content-center pb-4">
        <img
          className=""
          src={mapPage}
          style={{ height: "50%", width: "50%" }}
          alt="Scholarship"
        />
      </div>
      <div className="row justify-content-center mb-5 mx-4">
        {cities.map((city, index) => (
          <CitiesCard
            key={index}
            img_src={city.img_src}
            name={city.name}
            population={city.population}
            numSchools={city.numSchools}
            testScore={city.testScore}
            medianIncome={city.medianIncome}
            percentUnemployment={city.percentUnemployment}
            freeLunch={city.freeLunch}
            educated={city.educated}
            organization={city.organization}
            scholarship={city.scholarship}
          />
        ))}
      </div>
    </div>
  );
};

export default Cities;
