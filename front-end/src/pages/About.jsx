import React, { useState, useEffect } from "react";
import "./About.css";
import StatsCard from "../components/cards/StatsCard";
import { developers } from "../data/about";

function About() {
  const [contributors, setContributors] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch(
      "https://gitlab.com/api/v4/projects/54692100/repository/contributors",
      {
        method: "GET",
        headers: {
          "PRIVATE-TOKEN": "glpat-rxsy5-NkxUn32FePrjQn",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setContributors(json);
      })
      .catch((error) => console.log(error));

    fetch(
      "https://gitlab.com/api/v4/projects/54692100/issues?scope=all&per_page=1000",
      {
        method: "GET",
        headers: {
          "PRIVATE-TOKEN": "glpat-rxsy5-NkxUn32FePrjQn",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => setIssues(json))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2 style={{ padding: "1%", marginLeft: "0.5%" }}>About Us</h2>
      <div className="row justfiy-content-center mb-5">
        {developers.map((developer, index) => {
          const developers_res = contributors.filter((contributor_api) =>
            developer.emails.includes(contributor_api.email)
          );
          let numCommits = 0;

          if (developers_res.length > 0) {
            for (let i = 0; i < developers_res.length; i++) {
              numCommits += developers_res[i].commits;
            }
          }

          // count the number of issues closed by this developer
          const numIssues = issues.filter(
            (issue) => issue.closed_by && issue.closed_by.username === developer.gitlab_username
          ).length;
          return (
            <StatsCard {...{ ...developer, numCommits, numIssues, index }}/>
          );
        })}
      </div>
    </div>
  );
}
export default About;
