import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { format } from "date-fns"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveWaffle } from "@nivo/waffle"
import { ResponsivePie } from "@nivo/pie"
import { Helmet } from "react-helmet"
import compiledData from "../../data/dist/compiledData.json"
import DateSlider from "../components/DateSlider"

const IndexPage = () => {
  const [dailyData, setDailyData] = useState(Object.values(compiledData)[0])
  const {
    totalCases,
    countsByCounty,
    countsByGender,
    countsByHospitalization,
  } = dailyData
  const onDateSelected = date => {
    setDailyData(compiledData[format(date, "yyyy-MM-dd")])
  }
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MA COVID-19 Data Visualization</title>
      </Helmet>
      <div className="row">
        <div className="col-sm">
          <DateSlider onDateSelected={onDateSelected} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <h2>
            {format(new Date(dailyData.date + "T00:00:00"), "MM/dd/yyyy")} -{" "}
            {totalCases.presumptive + totalCases.confirmed} Total Cases
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <h3>{totalCases.presumptive} Presumptive Cases</h3>
        </div>
        <div className="col-sm">
          <h3>{totalCases.confirmed} Confirmed Cases</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm" style={{ minHeight: 80 }}>
          <ResponsiveBar
            data={[
              {
                state: "MA",
                ...totalCases,
              },
            ]}
            keys={["presumptive", "confirmed"]}
            layers={["bars"]}
            indexBy="state"
            maxValue={200}
            padding={0.3}
            layout="horizontal"
            colors={{ scheme: "nivo" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm" style={{ maxHeight: 400 }}>
          &nbsp;
          <ResponsiveBar
            data={countsByCounty}
            keys={["caseCount"]}
            layers={["bars", "axes"]}
            indexBy="county"
            axisBottom={null}
            margin={{ left: 120, bottom: 20 }}
            padding={0.1}
            layout="horizontal"
            anchor="center"
            colors={{ scheme: "nivo" }}
            maxValue={100}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm" style={{ maxHeight: 300 }}>
          <ResponsiveWaffle
            data={countsByGender}
            fillDirection="left"
            rows={10}
            columns={18}
            total={180}
            margin={{ top: 50, right: 10, bottom: 10, left: 10 }}
            legends={[
              {
                anchor: "top",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: -36,
                itemsSpacing: 4,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 1,
                itemTextColor: "#777",
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                      itemBackground: "#f7fafb",
                    },
                  },
                ],
              },
            ]}
          />
          <br />
        </div>
        <div className="col-sm" style={{ maxHeight: 300 }}>
          <ResponsivePie
            data={countsByHospitalization}
            innerRadius={0.5}
            margin={{ top: 50, bottom: 0, left: 50, right: 50 }}
          />
          <br />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
