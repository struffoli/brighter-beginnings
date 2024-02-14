import React, { useState, useEffect } from "react";
import "./About.css";
import { useSearchParams } from "react-router-dom";
import {developers} from "../data/about";

function AboutSubPage() {
  const [queryParameters] = useSearchParams();
  

  const getDev = (query) => {
    return developers.find(developers => developers.name === query);
  };

  const dev_name = queryParameters.get("name");
  const developer = getDev(dev_name);
  const role = developer.role;
  
  return (
    <div>
          Hi my name is {dev_name} and I love working on {role}!
    </div>
  );
}
export default AboutSubPage;
