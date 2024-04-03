import React, { useState, useEffect } from "react";
import "./Home.css";
import splash from "../assets/splash.png";
import ExploreCard from "../components/cards/ExploreCard";
import cityicon from "../assets/cityicon.png";
import orgicon from "../assets/orgicon.png";
import schpicon from "../assets/schpicon.png";
import downarrow from "../assets/downarrow.png";
import AwesomeSearch from "../components/AwesomeSearch";
import states from "../data/states";
import CitiesCard from "../components/cards/CitiesCard";
import OrganizationsCard from "../components/cards/OrganizationsCard";
import ScholarshipsCard from "../components/cards/ScholarshipsCard";

async function getCities() {
  let cities = [];
  let total_cities = 0;
  try {
    const response = await fetch("https://api.brighterbeginnings.me/cities");
    const result = await response.json();
    cities = result["Cities"];
    total_cities = result["Total cities"];
  } catch (error) {
    console.log(error);
  }
  return { cities, total_cities };
}

async function getOrganizations() {
  let organizations = [];
  let total_organizations = 0;
  try {
    const response = await fetch(
      "https://api.brighterbeginnings.me/organizations"
    );
    const result = await response.json();
    organizations = result["Organizations"];
    total_organizations = result["Total organizations"];
  } catch (error) {
    console.log(error);
  }
  return { organizations, total_organizations };
}

async function getScholarships() {
  let scholarships = [];
  let total_scholarships = 0;
  try {
    const response = await fetch(
      "https://api.brighterbeginnings.me/scholarships"
    );
    const result = await response.json();
    scholarships = result["Scholarships"];
    total_scholarships = result["Total scholarships"];
  } catch (error) {
    console.log(error);
  }
  return { scholarships, total_scholarships };
}

const Home = () => {
  const [apiCities, setApiCities] = useState({ cities: [], total_cities: 0 });
  useEffect(() => {
    getCities().then((data) => setApiCities(data));
  }, []);

  const [apiOrganizations, setApiOrganizations] = useState({
    organizations: [],
    total_organizations: 0,
  });
  useEffect(() => {
    getOrganizations().then((data) => setApiOrganizations(data));
  }, []);

  const [apiScholarships, setApiScholarships] = useState({
    scholarships: [],
    total_scholarships: 0,
  });
  useEffect(() => {
    getScholarships().then((data) => setApiScholarships(data));
  }, []);

  const [searchCities, setSearchCities] = useState({
    cities: [],
    total_cities: 0,
  });

  const [searchOrganizations, setSearchOrganizations] = useState({
    organizations: [],
    total_organizations: 0,
  });

  const [searchScholarships, setSearchScholarships] = useState({
    scholarships: [],
    total_scholarships: 0,
  });

  const [searchText, setSearchText] = useState("");

  const handleSitewideSearch = (searchText) => {
    if (searchText === "") {
      setSearchText("");
      setSearchCities({ cities: [], total_cities: 0 });
      setSearchOrganizations({ organizations: [], total_organizations: 0 });
      setSearchScholarships({ scholarships: [], total_scholarships: 0 });
    } else {
      setSearchText(searchText);
      setSearchCities({
        cities: apiCities.cities.filter(
          (city) =>
            city.name.toLowerCase().includes(searchText.toLowerCase()) ||
            city.state.toLowerCase().includes(searchText.toLowerCase()) ||
            states[city.state].abbreviation
              .toLowerCase()
              .includes(searchText.toLowerCase())
        ),
      });

      setSearchOrganizations({
        organizations: apiOrganizations.organizations.filter(
          (organization) =>
            organization.name
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            organization.organization_type
              .toLowerCase()
              .includes(searchText.toLowerCase())
        ),
      });

      setSearchScholarships({
        scholarships: apiScholarships.scholarships.filter(
          (scholarship) =>
            (scholarship.name &&
              scholarship.name
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (scholarship.awarded_by &&
              scholarship.awarded_by
                .toLowerCase()
                .includes(searchText.toLowerCase()))
        ),
      });
    }
  };

  return (
    <div>
      <video autoPlay loop muted id="splash-video" className="video">
        <source
          src={
            "https://gitlab.com/kxut/cs373-group-01/-/raw/main/front-end/src/assets/splash_video2.mp4?ref_type=heads"
          }
          type="video/mp4"
        />
      </video>
      <div className="d-flex flex-column align-items-center">
        <div className="splash-box fade-first d-flex flex-column align-items-center">
          <h1 className="mx-4 my-5 fade-first title-text">
            {/* <b style={{ color: "3cdfff" }}>Brighter Beginnings</b> */}
            <b style={{ color: "white" }}>Brighter Beginnings</b>
          </h1>
          <div className="d-flex flex-row align-items-center justify-content-center my-1 mb-5 w-75 fade-second">
            <img
              src={splash}
              style={{ objectFit: "cover", height: "20vw" }}
              alt={`Clipart of a student next to a lit lightbulb.`}
              className="mx-4"
            ></img>
            <h3
              className="mx-4 fade-second description-text"
              style={{ color: "white" }}
            >
              Financial constraints should never hinder the pursuit of
              knowledge. BrighterBeginnings aims to empower low-income K-12
              students to reach for the stars by connecting them with knowledge
              about scholarship opportunities and organizations providing aid,
              whether financial or otherwise.
            </h3>
          </div>
        </div>
        <div className="explore w-75">
          <div className="col-sm-12 text-center fade-third down-arrow">
            <img
              className="text-center bounce mb-5"
              src={downarrow}
              style={{ objectFit: "contain", height: "20px" }}
              alt={`Down arrow`}
            />
          </div>
          <div className="explore-info">
            <h1 className="text-center mt-5 mb-4">
              <b>Explore</b>
            </h1>
          </div>

          <div className="w-100">
            <AwesomeSearch handleSearch={handleSitewideSearch} />
          </div>

          {searchCities.cities.length !== 0 && (
            <>
              <div className="w-100">
                <p className="ms-4 ps-2 mb-2 pb-1">
                  <b>Cities</b>
                </p>
                <hr
                  className="mb-3"
                  style={{ width: "94%", margin: "auto" }}
                ></hr>
              </div>
              <div className="row justify-content-start mb-3 mx-4">
                {searchCities.cities.map((city, index) => (
                  <CitiesCard
                    key={index}
                    id={city.id}
                    img_src={city.img_src}
                    name={city.name}
                    population={city.population}
                    median_income={city.median_income}
                    poverty_rate={city.poverty_rate}
                    state={city.state}
                    unemployment_rate={city.unemployment_rate}
                    organization={city.organization}
                    scholarship={city.scholarship}
                    searchText={searchText}
                  />
                ))}
              </div>
            </>
          )}

          {searchOrganizations.organizations.length !== 0 && (
            <>
              <div className="w-100">
                <p className="ms-4 ps-2 mb-2 pb-1">
                  <b>Organizations</b>
                </p>
                <hr
                  className="mb-3"
                  style={{ width: "94%", margin: "auto" }}
                ></hr>
              </div>
              <div className="row justify-content-start mb-3 mx-4">
                {searchOrganizations.organizations.map((org, index) => (
                  <OrganizationsCard
                    key={index}
                    img_src={org.img_src}
                    name={org.name}
                    id={org.id}
                    email={org.email}
                    phone={org.phone}
                    organization_type={org.organization_type}
                    city={org.city}
                    scholarship={org.scholarship}
                    searchText={searchText}
                  />
                ))}
              </div>
            </>
          )}

          {searchScholarships.scholarships.length !== 0 && (
            <>
              <div className="w-100">
                <p className="ms-4 ps-2 mb-2 pb-1">
                  <b>Scholarships</b>
                </p>
                <hr
                  className="mb-3"
                  style={{ width: "94%", margin: "auto" }}
                ></hr>
              </div>
              <div className="row justify-content-start mb-5 mx-4">
                {searchScholarships.scholarships.map((scholarship, index) => (
                  <ScholarshipsCard
                    key={index}
                    img_src={scholarship.img_src}
                    name={scholarship.name}
                    id={scholarship.id}
                    awarded_by={scholarship.awarded_by}
                    award_amount={scholarship.award_amount}
                    nationwide={scholarship.nationwide}
                    need_based={scholarship.need_based}
                    merit_based={scholarship.merit_based}
                    essay_based={scholarship.essay_based}
                    link={scholarship.link}
                    searchText={searchText}
                  />
                ))}
              </div>
            </>
          )}

          {/* <div className="d-flex flex-row align-items-center justify-content-center w-75 my-1 mb-5"> */}
          <div className="row justify-content-center mb-3 mx-5 mt-4">
            {/* Icon by tuhlpan */}
            <ExploreCard img_src={cityicon} name="Cities" />
            {/* Icon by kmg design */}
            <ExploreCard img_src={orgicon} name="Organizations" />
            {/* Icon by Freepik */}
            <ExploreCard img_src={schpicon} name="Scholarships" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
