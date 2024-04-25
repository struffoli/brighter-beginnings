import React, { useState, useEffect } from "react";
import "./Home.css";
import splash from "../assets/splash.png";
import ExploreCard from "../components/cards/ExploreCard";
import cityicon from "../assets/cityicon.png";
import orgicon from "../assets/orgicon.png";
import schpicon from "../assets/schpicon.png";
import downarrow from "../assets/downarrow.png";
import AwesomeSearch from "../components/AwesomeSearch";
// import states from "../data/states";
import CitiesCard from "../components/cards/CitiesCard";
import OrganizationsCard from "../components/cards/OrganizationsCard";
import ScholarshipsCard from "../components/cards/ScholarshipsCard";
import { getCities } from "./Cities";
import { getOrganizations } from "./Organizations";
import { getScholarships } from "./Scholarships";
import Pagination from "../components/Pagination.jsx";

const Home = () => {
  const [currentPageCity, setCurrentPageCity] = useState(1);
  const [currentPageOrg, setCurrentPageOrg] = useState(1);
  const [currentPageScholarship, setCurrentPageScholarship] = useState(1);
  const [itemsPerPage] = useState(15); // Set the number of items per page
  const [apiCities, setApiCities] = useState({ cities: [], total_cities: 0 });
  useEffect(() => {
    getCities("", null).then((data) => setApiCities(data));
  }, []);

  const [apiOrganizations, setApiOrganizations] = useState({
    organizations: [],
    total_organizations: 0,
  });
  useEffect(() => {
    getOrganizations("", null).then((data) => setApiOrganizations(data));
  }, []);

  const [apiScholarships, setApiScholarships] = useState({
    scholarships: [],
    total_scholarships: 0,
  });
  useEffect(() => {
    getScholarships("", null).then((data) => setApiScholarships(data));
  }, []);

  const [searchText, setSearchText] = useState("");

  const handleSitewideSearch = (newText) => {
    if (searchText !== newText) {
      if (newText === "") {
        setSearchText("");
        setApiCities({ cities: [], total_cities: 0 });
        setApiOrganizations({ organizations: [], total_organizations: 0 });
        setApiScholarships({ scholarships: [], total_scholarships: 0 });
      } else {
        setSearchText(newText);

        getCities(newText, null).then((data) => setApiCities(data));

        getOrganizations(newText, null).then((data) =>
          setApiOrganizations(data)
        );

        getScholarships(newText, null).then((data) => setApiScholarships(data));
      }
      setCurrentPageCity(1);
      setCurrentPageOrg(1);
      setCurrentPageScholarship(1);
    }
  };

  const indexOfLastCityItem = currentPageCity * itemsPerPage;
  const indexOfFirstCityItem = indexOfLastCityItem - itemsPerPage;
  const currentCityItems = apiCities.cities.slice(
    indexOfFirstCityItem,
    indexOfLastCityItem
  );
  const paginateCity = (pageNumber) => setCurrentPageCity(pageNumber);

  const indexOfLastOrgItem = currentPageOrg * itemsPerPage;
  const indexOfFirstOrgItem = indexOfLastOrgItem - itemsPerPage;
  const currentOrgItems = apiOrganizations.organizations.slice(
    indexOfFirstOrgItem,
    indexOfLastOrgItem
  );
  const paginateOrg = (pageNumber) => setCurrentPageOrg(pageNumber);

  const indexOfLastScholarshipItem = currentPageScholarship * itemsPerPage;
  const indexOfFirstScholarshipItem = indexOfLastScholarshipItem - itemsPerPage;
  const currentScholarshipItems = apiScholarships.scholarships.slice(
    indexOfFirstScholarshipItem,
    indexOfLastScholarshipItem
  );
  const paginateScholarship = (pageNumber) =>
    setCurrentPageScholarship(pageNumber);

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
            <AwesomeSearch
              handleSearch={handleSitewideSearch}
              onlySearch={true}
            />
          </div>

          {searchText.length !== 0 &&
            apiCities.cities.length === 0 &&
            apiOrganizations.organizations.length === 0 &&
            apiScholarships.scholarships.length === 0 && (
              <div className="text-center mt-2 pt-1">
                <h4>No items found!</h4>
              </div>
            )}

          {apiCities.cities.length !== 0 && (
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
                {currentCityItems.map((city, index) => (
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
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={apiCities.cities.length}
                  paginate={paginateCity}
                  currentPage={currentPageCity}
                  currentItems={currentCityItems}
                />
              </div>
            </>
          )}

          {apiOrganizations.organizations.length !== 0 && (
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
                {currentOrgItems.map((org, index) => (
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
                    adress={org.address}
                  />
                ))}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={apiOrganizations.organizations.length}
                  paginate={paginateOrg}
                  currentPage={currentPageOrg}
                  currentItems={currentOrgItems}
                />
              </div>
            </>
          )}

          {apiScholarships.scholarships.length !== 0 && (
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
                {currentScholarshipItems.map((scholarship, index) => (
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
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={apiScholarships.scholarships.length}
                  paginate={paginateScholarship}
                  currentPage={currentPageScholarship}
                  currentItems={currentScholarshipItems}
                />
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
