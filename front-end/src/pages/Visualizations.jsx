import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Label,
  BarChart,
  Legend,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { getCities } from "./Cities";
import { getScholarships } from "./Scholarships";

const Visualizations = () => {
  const [scatterData, setScatterData] = useState();
  const [scholarshipData, setScholarshipData] = useState();
  useEffect(() => {
    const getData = async () => {
      await getCities("", null).then(
        (data) => setScatterData(data.cities)
        // data.cities.forEach((city) => {
        //   scatterData.push({
        //     name: city.name,
        //     x: Math.round(city.poverty_rate * 1000) / 10,
        //     y: Math.round(city.unemployment_rate * 1000) / 10,
        //   });
        // })
      );

      let scholarships = [
        { name: "Need Based", value: 0, count: 0 },
        { name: "Merit Based", value: 0, count: 0 },
        { name: "Essay Required", value: 0, count: 0 },
      ];

      await getScholarships("", null).then((data) => {
        data.scholarships.forEach((scholarship) => {
          if (scholarship.need_based) {
            scholarships[0].value += scholarship.award_amount;
            scholarships[0].count += 1;
          }
          if (scholarship.merit_based) {
            scholarships[1].value += scholarship.award_amount;
            scholarships[1].count += 1;
          }
          if (scholarship.essay_based) {
            scholarships[2].value += scholarship.award_amount;
            scholarships[2].count += 1;
          }
        });
      });

      scholarships[0].value = Math.round(
        scholarships[0].value / scholarships[0].count
      );
      scholarships[1].value = Math.round(
        scholarships[1].value / scholarships[1].count
      );
      scholarships[2].value = Math.round(
        scholarships[2].value / scholarships[2].count
      );
      setScholarshipData(scholarships);
    };
    getData();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="title mt-5">
        <b>Visualizations</b>
      </h2>
      <div className="w-75 d-flex flex-column justify-content-center align-items-center">
        <ResponsiveContainer width="100%" height={600}>
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
              dataKey="poverty_rate"
              name="poverty rate"
              unit=""
            >
              <Label
                value="Poverty Rate"
                offset={0}
                position="outside"
                angle={0}
                dx={0}
                dy={20}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="unemployment_rate"
              name="unemployment rate"
              unit=""
            >
              <Label
                value="Unemployment Rate"
                offset={0}
                position="outside"
                angle={-90}
                dx={-40}
                dy={0}
              />
            </YAxis>
            <ZAxis dataKey="name" name="city" unit="" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="A school" data={scatterData} fill="#4a90e2" />
          </ScatterChart>
        </ResponsiveContainer>

        <BarChart
          width={800}
          height={800}
          data={scholarshipData}
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
              value="Average Award Amount"
              offset={0}
              position="outside"
              angle={-90}
              dx={-40}
              dy={0}
            />
          </YAxis>
          <Tooltip />
          <Legend iconType="circle" />
          <Bar dataKey="value" fill="#4a90e2" unit=" USD" />
        </BarChart>

        <ResponsiveContainer height={800}>
          <RadarChart data={scholarshipData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={-30} />
            <Radar
              name="Scholarships"
              dataKey="count"
              fill="#4a90e2"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="mx-4 my-3 mt-4">
          <b>Critiques</b>
        </h1>
        <h4 className="my-3 pt-1 w-100 mb-5 pb-5">
          WE LOVE TO CODE!!!!!!!!!!!! a lot because we really do love to code
        </h4>
      </div>
    </div>
  );
};
export default Visualizations;
