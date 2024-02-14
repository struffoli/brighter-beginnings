import React from "react";
import CitiesCard from "../components/cards/CitiesCard";
import { citiesData } from "../data/cities.js"; // Importing cities data

const Cities = () => {
  return (
    <div>
      <h2 className="mx-4 my-4 px-2">
        <b>Cities</b>
      </h2>
      <div className="row justify-content-center mb-5 mx-4">
        {citiesData.map((city, index) => (
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
          />
        ))}
      </div>
    </div>
  );
};

export default Cities;
