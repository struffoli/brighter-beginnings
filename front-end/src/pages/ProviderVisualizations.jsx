import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Sector,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Bar,
  ResponsiveContainer,
  ScatterChart,
  ZAxis,
  Scatter,
} from "recharts";
// import { getCities } from "./Cities";
// import { getScholarships } from "./Scholarships";

async function getProviderLegislation() {
  let legislation = [];
  let total_legislation = 0;
  try {
    const response = await fetch("https://api.choiceconnect.me/legislation");
    const result = await response.json();
    legislation = result["legislation"];
    total_legislation = result["count"];
  } catch (error) {
    console.log(error);
  }
  return { legislation, total_legislation };
}

async function getProviderCities() {
  let cities = [];
  let total_cities = 0;
  try {
    const response = await fetch("https://api.choiceconnect.me/clinics");
    const result = await response.json();
    cities = result["clinics"];
    total_cities = result["count"];
  } catch (error) {
    console.log(error);
  }
  return { cities, total_cities };
}

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} States`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const ProviderVisualizations = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const [pieData, setPieData] = useState();
  const [barData, setBarData] = useState();
  const [scatterData, setScatterData] = useState();
  // const [scatterData, setScatterData] = useState();
  // const [scholarshipData, setScholarshipData] = useState();
  useEffect(() => {
    const getData = async () => {
      let legislation = [
        { name: "Legal", count: 0 },
        { name: "Restricted", count: 0 },
        { name: "Illegal", count: 0 },
      ];

      let legislation_bar = [
        { name: "Total illegal/restricted", count: 0 },
        { name: "Danger to mother's life", count: 0 },
        { name: "Risk to mother's health", count: 0 },
        { name: "Lethal anomaly in fetus", count: 0 },
        { name: "Rape/incest", count: 0 },
      ];

      let states = {};

      await getProviderLegislation().then((data) => {
        data.legislation.forEach((state) => {
          states[state.state] = state.banned_after_weeks_since_LMP;
          if (
            state.banned_after_weeks_since_LMP === "N/A" ||
            state.banned_after_weeks_since_LMP === "99"
          ) {
            legislation[0].count++;
          } else {
            legislation_bar[0].count++;
            if (state.exception_life) {
              legislation_bar[1].count++;
            }
            if (state.exception_health !== "N/A") {
              legislation_bar[2].count++;
            }
            if (state.exception_fetal !== "N/A") {
              legislation_bar[3].count++;
            }
            if (state.exception_rape_or_incest) {
              legislation_bar[4].count++;
            }
            if (state.banned_after_weeks_since_LMP !== "0") {
              legislation[1].count++;
            } else {
              legislation[2].count++;
            }
          }
        });
      });

      await getProviderCities().then((data) =>
        setScatterData(
          data.cities.filter(
            (city) =>
              states[city.state] !== 99 &&
              states[city.state] !== "N/A" &&
              city.total_females < 5000000
          )
        )
      );

      setPieData(legislation);
      console.log(legislation_bar);
      setBarData(legislation_bar);
    };
    getData();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="title mt-5">
        <b>Provider Visualizations</b>
      </h2>
      <div className="w-75 d-flex flex-column justify-content-center align-items-center">
        <PieChart width={800} height={650}>
          <Pie
            dataKey="count"
            data={pieData}
            innerRadius={80}
            outerRadius={250}
            fill="#4a90e2"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
          />
          <Legend
            payload={[{ value: "States", type: "circle", color: "#4a90e2" }]}
          />
        </PieChart>

        <BarChart
          width={1200}
          height={800}
          data={barData}
          margin={{
            top: 100,
            right: 20,
            left: 20,
            bottom: 100,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis>
            <Label
              value="Number of states"
              offset={0}
              position="outside"
              angle={-90}
              dx={-40}
              dy={0}
            />
          </YAxis>
          <Tooltip />
          <Legend
            payload={[
              {
                value: "Exceptions",
                color: "#4a90e2",
              },
            ]}
          />
          <Bar dataKey="count" fill="#4a90e2" unit=" states" />
        </BarChart>

        <ResponsiveContainer width={1000} height={600}>
          <ScatterChart
            margin={{
              top: 100,
              right: 20,
              bottom: 100,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="total_females"
              name="women of reproductive age"
              unit=""
            >
              <Label
                value="Women of Reproductive Age"
                offset={0}
                position="outside"
                angle={0}
                dx={0}
                dy={15}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="num_facilities"
              name="number of facilities"
            >
              <Label
                value="Number of Facilities"
                offset={0}
                position="outside"
                angle={-90}
                dx={-30}
                dy={0}
              />
            </YAxis>
            <ZAxis dataKey="city" name="city" unit="" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={scatterData} fill="#4a90e2" />
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="center"
              payload={[
                {
                  value: "City where abortion is restricted",
                  color: "#4a90e2",
                },
              ]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="mx-4 my-3 mt-4">
          <b>Critiques</b>
        </h1>
        <h4 className="my-3 pt-1 w-75 mb-5 pb-5 text-center">
          Our developer's website does an excellent job of providing a good user
          experience as the theming of the website is very consistent across
          pages and information is easily accessible. The attention to detail
          with styling provides an experience that is comfortable and navigable.
          Their RESTful API is well documented; it was both easy to use and
          efficient when grabbing data for our visualizations. Every phase they
          did a great job at implementing our user stories. There was no need to
          negotiate what we expected of them and they efficiently implemented
          our requested features exactly as intended. We learned a lot of things
          from their website in the frontend aspect, and their search algorithm
          provided us with a good starting point to implement our own. Something
          they could improve upon is to sort the community activities so that
          past events do not default to the first instances displayed. Some of
          the fields on their instances are a little puzzling for a first-time
          user. For instance, it could be made clear that in legislation
          information that the time before banned is time since the last
          menstrual period. Also, it is not clear if there is a difference
          between "N/A" and "99" weeks for the ban time.
        </h4>
      </div>
    </div>
  );
};
export default ProviderVisualizations;
