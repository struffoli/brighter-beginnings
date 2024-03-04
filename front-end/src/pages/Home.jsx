import React from "react";
import "./Home.css";
import splash from "../assets/splash.png";
import ExploreCard from "../components/cards/ExploreCard";
import cityicon from "../assets/cityicon.png";
import orgicon from "../assets/orgicon.png";
import schpicon from "../assets/schpicon.png";

const Home = () => {
  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <h1 className="mx-4 my-4 mb-4">
          <b style={{ color: "#3cdfff" }}>BrighterBeginnings</b>
        </h1>
        <div className="d-flex flex-row align-items-center justify-content-center w-75 my-1 mb-5">
          <img
            src={splash}
            style={{ objectFit: "cover", height: "300px" }}
            alt={`Clipart of a student next to a lit lightbulb.`}
            className="mx-5"
          ></img>
          <h4 className="w-50 mx-5">
            Financial constraints should never hinder the pursuit of knowledge.
            BrighterBeginnings aims to empower low-income K-12 students to reach
            for the stars by connecting them with knowledge about scholarship
            opportunities and organizations providing aid, whether financial or
            otherwise.
          </h4>
        </div>
        <h2 className="text-center my-3 my-5">Explore</h2>
        <div className="d-flex flex-row align-items-center justify-content-center w-75 my-1 mb-5">
          {/* Icon by tuhlpan */}
          <ExploreCard img_src={cityicon} name="Cities" />
          {/* Icon by kmg design */}
          <ExploreCard img_src={orgicon} name="Organizations" />
          {/* Icon by Freepik */}
          <ExploreCard img_src={schpicon} name="Scholarships" />
        </div>
      </div>
    </div>
  );
};
export default Home;
