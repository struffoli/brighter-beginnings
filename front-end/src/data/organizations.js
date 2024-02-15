import texasace from "../assets/texasace.png";
import educationTrust from "../assets/theeducationtrust.png";
import texasSchoolGuide from "../assets/texasschoolguide.jpg";

export const organizations = [
  {
    img_src: texasace,
    name: "Texas ACE",
    id: 1,
    city: "Austin",
    location: "1701 N. Congress Avenue, Austin, Texas, 78701",
    distance: "5 miles",
    contactInfo: "512-463-9734",
    organizationType: "Government",
    scholarships: ["Future Leaders Scholarship"]
  },
  {
    img_src: educationTrust,
    name: "The Education Trust in Washington",
    id: 2,
    city: "Washington",
    location: "1501 K St. NW, Suite 200, Washington, DC 20005",
    distance: "5 miles",
    contactInfo: "202-293-1217",
    organizationType: "Non-profit",
    scholarships: ["Horatio Alger National Scholarship"]
  },
  {
    img_src: texasSchoolGuide,
    name: "Texas School Guide",
    id: 3,
    city: "Dallas",
    location: "2900 Live Oak St., Dallas, TX 75204",
    contactInfo: "214-599-0072",
    organizationType: "Educational",
    scholarships: ["Future Leaders Scholarship"]
  }
];
