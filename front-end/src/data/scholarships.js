import futureleaders from "../assets/futureleaders.png";
import haganScholarship from "../assets/haganscholarship.jpg";  
import horatioalger from "../assets/horatioalger.png";

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
    organization: "Texas Ace"
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
    organization: "Texas School Guide"
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
    organization: "The Education Trust in Washington"
  }
];
