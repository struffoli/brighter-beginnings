import React, { useState, useEffect } from "react";
import "./About.css";
import StatsCard from "../components/cards/StatsCard";
import ToolsCard from "../components/cards/ToolsCard";
import { developers } from "../data/about";
import { tools } from "../data/tools";

export async function getDeveloperInfo() {
  let contributors = [];
  let issues = [];
  let totalCommits = 0;
  let totalClosedIssues = 0;

  try {
    const response = await fetch(
      "https://gitlab.com/api/v4/projects/54692100/repository/contributors",
      {
        method: "GET",
        headers: {
          "PRIVATE-TOKEN": "glpat-rxsy5-NkxUn32FePrjQn",
        },
      }
    );
    const allContributors = await response.json();
    contributors = allContributors.filter((contributor) =>
      developers.some((developer) =>
        developer.emails.includes(contributor.email)
      )
    );
    totalCommits = contributors.reduce(
      (acc, contributor) => acc + contributor.commits,
      0
    );
  } catch (error) {
    console.log(error);
  }

  try {
    const response = await fetch(
      "https://gitlab.com/api/v4/projects/54692100/issues?scope=all&per_page=1000",
      {
        method: "GET",
        headers: {
          "PRIVATE-TOKEN": "glpat-rxsy5-NkxUn32FePrjQn",
        },
      }
    );
    const allIssues = await response.json();
    issues = allIssues.filter(
      (issue) =>
        issue.closed_by &&
        developers.some(
          (developer) => developer.gitlab_username === issue.closed_by.username
        )
    );
    totalClosedIssues = issues.length;
  } catch (error) {
    console.log(error);
  }

  return { contributors, issues, totalCommits, totalClosedIssues };
}

function About() {
  const [devInfo, setDevInfo] = useState({ contributors: [], issues: [] });

  useEffect(() => {
    getDeveloperInfo().then((data) => setDevInfo(data));
  }, []);

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <h1 className="mx-4 my-3 mt-4">
          <b>About Us</b>
        </h1>
        <h4 className="mx-4 my-3 pt-1 w-75">
          We made this website because we wanted to provide an information hub
          where low-income K-12 students can come to explore sources of aid such
          as from organizations or scholarships.
        </h4>
        <h4 className="mx-4 my-3 mb-4 pt-1 w-75">
          The integration of disparate data makes us think about how all of
          these sources of aid are connected and how the information comes
          together. This gets us thinking about what information is useful, and
          we then filter out what we think isn't as necessary.
        </h4>
      </div>

      <h1 className="text-center my-3 mb-4">
        <b>Meet the Team</b>
      </h1>

      <div className="row justify-content-center mb-5 mx-5 mt-4">
        {developers.map((developer, index) => {
          const developers_res = devInfo.contributors.filter(
            (contributor_api) =>
              developer.emails.includes(contributor_api.email)
          );
          let numCommits = 0;

          if (developers_res.length > 0) {
            for (let i = 0; i < developers_res.length; i++) {
              numCommits += developers_res[i].commits;
            }
          }

          // count the number of issues closed by this developer
          const numIssues = devInfo.issues.filter(
            (issue) =>
              issue.closed_by &&
              issue.closed_by.username === developer.gitlab_username
          ).length;
          return (
            <StatsCard {...{ ...developer, numCommits, numIssues, index }} />
          );
        })}
      </div>

      <div className="text-center my-3">
        <h2>Totals</h2>
        <p>
          <b>Total Commits: </b> {devInfo.totalCommits}
        </p>
        <p>
          <b>Total Issues Closed: </b> {devInfo.totalClosedIssues}
        </p>
      </div>

      <h1 className="text-center my-3 mb-4">
        <b>Tools Used</b>
      </h1>
      <div className="row justify-content-center mb-5 mx-5 mt-4 align-items-center">
        {tools.map((tool, index) => {
          return <ToolsCard {...{ ...tool, index }} />;
        })}
      </div>

      <div className="d-flex flex-column align-items-center">
        <h2 className="mx-4 my-3 mt-4">
          <b>Data Sources</b>
        </h2>
        <h4 className="mx-4 my-3 pt-1 w-75 text-center">
          <a
            href="https://github.com/jasminevasandani/ACT_SAT_Data_Recommendations/tree/master/data"
            target="_blank"
            rel="noreferrer"
          >
            ACT/SAT Data by State
          </a>
        </h4>
        <h4 className="mx-4 my-3 pt-1 w-75 text-center">
          <a
            href="https://educationdata.urban.org/documentation/index.html"
            target="_blank"
            rel="noreferrer"
          >
            US School/District Data
          </a>
        </h4>
        <h4 className="mx-4 my-3 pt-1 w-75 text-center">
          <a
            href="https://www.census.gov/data/developers/data-sets.html"
            target="_blank"
            rel="noreferrer"
          >
            Census Data API
          </a>
        </h4>
        <h4 className="mx-4 my-3 pt-1 w-75 text-center">
          <a
            href="https://www.guidestar.org/search"
            target="_blank"
            rel="noreferrer"
          >
            Search for Nonprofits
          </a>
        </h4>
        <h4 className="mx-4 my-3 pt-1 w-75 text-center">
          <a
            href="https://tryapis.com/googlemaps"
            target="_blank"
            rel="noreferrer"
          >
            Google Maps
          </a>
        </h4>
        <h4 className="mx-4 my-3 pt-1 w-75 text-center">
          <a
            href="https://www.mediawiki.org/wiki/API:Main_page"
            target="_blank"
            rel="noreferrer"
          >
            MediaWiki (Wikipedia API)
          </a>
        </h4>
      </div>

      <div className="text-center my-5 align-items-center">
        <a
          href="https://documenter.getpostman.com/view/32954458/2sA2r6WPJG"
          target="_blank"
          rel="noreferrer"
          className="btn p-3 btnHover mx-3"
          style={{ backgroundColor: "#d8f9ff" }}
        >
          <h4 style={{ marginBottom: "0" }}>API Documentation</h4>
        </a>
        <a
          href="https://gitlab.com/kxut/cs373-group-01"
          target="_blank"
          rel="noreferrer"
          className="btn p-3 btnHover mx-3"
          style={{ backgroundColor: "#d8f9ff" }}
        >
          <h4 style={{ marginBottom: "0" }}>GitLab Repository</h4>
        </a>
      </div>
    </div>
  );
}
export default About;
