import futureleaders from "../assets/futureleaders.png";
import haganScholarship from "../assets/haganscholarship.jpg";
import horatioalger from "../assets/horatioalger.png";

import haganWinner from "../assets/haganwinner.png";
import horatioWinner from "../assets/horatioalgerwinner.png";
import kpmgWinner from "../assets/kpmgwinner.png";

export const scholarships = [
  {
    img_src: haganScholarship,
    name: "The Hagan Scholarship",
    id: 1,
    donor: "Dan Hagan",
    area: "Need-based",
    ageGroup: "K-12",
    award: "$7,500",
    recipients: 10,
    description: "Nationwide need-based merit scholarship",
    city: "Austin",
    organization: "Texas ACE",
    winnerpic: haganWinner,
    link: "https://haganscholarships.org/application/",
  },
  {
    img_src: futureleaders,
    name: "Future Leaders Scholarship",
    id: 2,
    donor: "Tech Innovators Inc.",
    area: "Technology",
    ageGroup: "18-24",
    award: "$5000",
    recipients: 10,
    description: "For aspiring tech leaders",
    city: "Dallas",
    organization: "Texas School Guide",
    winnerpic: kpmgWinner,
    link: "https://womensleadership.kpmg.us/charitable/developing-future-generations-women-leaders1.html",
  },
  {
    img_src: horatioalger,
    name: "Horatio Alger National Scholarship",
    id: 3,
    donor: "Horatio Alger Foundation",
    area: "Diversity",
    ageGroup: "Highschool Juniors & Seniors",
    award: "$25,000",
    recipients: 75,
    description: "One of the largest need-based scholarships",
    city: "Washington",
    organization: "The Education Trust in Washington",
    winnerpic: horatioWinner,
    link: "https://app.smarterselect.com/programs/93417",
  },
];
