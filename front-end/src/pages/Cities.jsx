import React from "react";
import CitiesCard from "../components/cards/CitiesCard";
import { cities } from "../data/cities.js"; // Importing cities data

const Cities = () => {
  return (
    <div>
      <h2 className="mx-4 my-4 px-2">
        <b>Cities</b>
      </h2>
      <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1031763.06947323!2d-99.04791253196134!3d30.199253125660793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b599a0cc032f%3A0x5d9b464bd469d57a!2sAustin%2C%20TX!5e0!3m2!1sen!2sus!4v1707970783329!5m2!1sen!2sus"
          styles={{ width: "600", height: "450", border: "0" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Austin, TX"
        ></iframe>
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
