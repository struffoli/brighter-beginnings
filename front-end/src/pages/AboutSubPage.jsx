import { React, useState, useEffect }from "react";
import { getDeveloperInfo } from "./About";
import { useSearchParams } from "react-router-dom";
import {developers} from "../data/about";

function AboutSubPage() {
  const [queryParameters] = useSearchParams();
  

  const getDev = (query) => {
    return developers.find(developers => developers.name === query);
  };

  const dev_name = queryParameters.get("name");
  const developer = getDev(dev_name);

  // copied from About, we'll do this differently later i guess
  const [devInfo, setDevInfo] = useState({ contributors: [], issues: [] });
  useEffect(() => {
    getDeveloperInfo().then(data => setDevInfo(data));
  }, []);
  const developers_res = devInfo.contributors.filter((contributor_api) =>
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
  const tests = 0;
  
  return (
    <div className="container" style={{ marginTop: "3%" }}>
      <div className="row justify-content-center">
        <img className=""
          src={developer.img_src}
          style={{height: "30%", width: "30%"}}
          alt="Developer"
        />
      </div>
      <p className="card-text">Role: {developer.role}</p>
      <p className="card-text">
        <i>{developer.description}</i>
      </p>
      <ul
        className="list-group list-group-flush"
        style={{ marginLeft: "3%" }}
      >
        <li>Commits: {numCommits}</li>
        <li>Issues closed: {numIssues}</li>
        <li>Unit Tests: {tests}</li>
      </ul>
    </div>
  );
}

export default AboutSubPage;
