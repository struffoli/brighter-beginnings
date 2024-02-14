import React from "react";
import "./Home.css";
import splash from "../assets/splash.jpg";

const Home = () => {
  return (
    <div>
      <h2 style={{ padding: "1%", marginLeft: "0.5%" }}>Home</h2>
      <div
        style={{ textAlign: "center", width: "100%", justifyContent: "center" }}
      >
        <img src={splash} />
        <h4
          style={{
            width: "50%",
            marginLeft: "25%",
            marginTop: "3%",
            textAlign: "center",
          }}
        >
          Empowering today's students and tomorrow's leaders by providing
          information for accessible sources of aid for low-income students. 
          Use the NavBar to navigate through our database of cities,
          scholarships, and organizations providing aid.
        </h4>
      </div>
    </div>
  );
};
export default Home;
