import { React } from "react";
import { useSearchParams } from "react-router-dom";
import { cities } from "../data/cities.js";
import { organizations } from "../data/organizations.js";
import { scholarships } from "../data/scholarships.js";

function CitySubPage() {
  const [queryParameters] = useSearchParams();

  const getCity = (query) => {
    return cities.find((c) => c.name === query);
  };

  const city_name = queryParameters.get("name");
  const city = getCity(city_name);

  return (
    <div className="container" style={{ marginTop: "3%" }}>
      <div className="row justify-content-center">
        <img
          className=""
          src={city.img_src}
          style={{ height: "30%", width: "30%" }}
          alt="City"
        />
      </div>
      <div className="">
        <h5 className="" style={{ paddingBottom: "4px" }}>
          {city.name}
        </h5>
        <p className="">
          <b>Population:</b> {city.population}
        </p>
        <p className="">
          <b>Number of Schools:</b> {city.numSchools}
        </p>
        <p className="">
          <b>Average SAT:</b> {city.testScore}
        </p>
        <p className="">
          <b>Median Income:</b> {city.medianIncome}
        </p>
        <p className="">
          <b>Percent Unemployment:</b> {city.percentUnemployment}%
        </p>
        <p className="">
          <b>Percent of Students on Free/Reduced Lunch:</b> {city.freeLunch}%
        </p>
        <p className="">
          <b>Percent of Adults College Educated:</b> {city.educated}%
        </p>
        {city.organizations.length > 0 ? (
          <p className="">
            <b>Organizations:</b>
            {city.organizations.map((organization) => {
              const org = organizations.find((o) => o.name === organization);
              return (
                <p>
                  <a href={`/organizations/org?name=${org.name}`}>{org.name}</a>
                </p>
              );
            })}
          </p>
        ) : (
          <></>
        )}
        {city.scholarships.length > 0 ? (
          <p className="">
            <b>Scholarships:</b>
            {city.scholarships.map((scholarship) => {
              const schp = scholarships.find(
                (schp) => schp.name === scholarship
              );
              return (
                <p>
                  <a href={`/scholarships/schp?name=${schp.name}`}>
                    {schp.name}
                  </a>
                </p>
              );
            })}
          </p>
        ) : (
          <></>
        )}
        <ul className="list-group list-group-flush"></ul>
      </div>
    </div>
  );
}

export default CitySubPage;
