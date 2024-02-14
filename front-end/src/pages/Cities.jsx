import React from "react";
import CitiesCard from "../components/cards/CitiesCard";
import { citiesData } from "../data/cities.js"; // Importing cities data

const Cities = () => {
  return (
    <div>
      <h2 style={{ padding: "1%", marginLeft: "0.5%" }}>Cities</h2>
      <div className="row justify-content-center mb-5 mx-2">
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
