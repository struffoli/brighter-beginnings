import acescholarship from "../assets/acescholarship.jpg"
import haganScholarship from "../assets/haganscholarship.jpg";  
import horatioalger from "../assets/horatioalger.png";

export const scholarships = [
  {
    img_src: acescholarship,
    name: "ACE Scholarship",
    id: 2,
    donor: "Alex Cranberg, Charlie Gallagher, Ralph Nagel, John Saeman",
    area: "Low-income students",
    ageGroup: "K-12",
    award: "$2000-$3,000",
    recipients: 10,
    description: "To provide children of lower-income families with scholarships to private schools in grades K-12, and to advocate for expanded school choice",
  },
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
  }
];
