import React from "react";
import "./Home.css";
import splash from "../assets/splash.png";
import ExploreCard from "../components/cards/ExploreCard";
import cityicon from "../assets/cityicon.png";
import orgicon from "../assets/orgicon.png";
import schpicon from "../assets/schpicon.png";
// import splash_video from "../assets/splash_video.mp4";
import downarrow from "../assets/downarrow.png";

const Home = () => {
  return (
    <div>
      <video autoPlay muted id="splash-video" className="video">
        <source
          src={
            "https://gitlab.com/kxut/cs373-group-01/-/raw/main/front-end/src/assets/splash_video.mp4?ref_type=heads"
          }
          type="video/mp4"
        />
      </video>
      <div className="d-flex flex-column align-items-center">
        <h1 className="title mx-4 my-5 fade-first">
          {/* <b style={{ color: "3cdfff" }}>Brighter Beginnings</b> */}
          <b style={{ color: "white" }}>Brighter Beginnings</b>
        </h1>
        <div className="d-flex flex-row align-items-center justify-content-center my-1 mb-5 w-75 fade-second">
          <img
            src={splash}
            style={{ objectFit: "cover", height: "325px" }}
            alt={`Clipart of a student next to a lit lightbulb.`}
            className="mx-4"
          ></img>
          <h3 className="mx-5 fade-second" style={{ color: "white" }}>
            Financial constraints should never hinder the pursuit of knowledge.
            BrighterBeginnings aims to empower low-income K-12 students to reach
            for the stars by connecting them with knowledge about scholarship
            opportunities and organizations providing aid, whether financial or
            otherwise.
          </h3>
        </div>
        <div className="explore">
          <div class="col-sm-12 text-center fade-third">
            <img
              className="text-center bounce mb-5"
              src={downarrow}
              style={{ objectFit: "contain", height: "20px" }}
              alt={`Down arrow`}
            />
          </div>
          <div className="explore-info">
            <h1 className="text-center my-5">
              <b>Explore</b>
            </h1>
          </div>
          {/* <div className="d-flex flex-row align-items-center justify-content-center w-75 my-1 mb-5"> */}
          <div className="row justify-content-center mb-5 mx-5 mt-4">
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
