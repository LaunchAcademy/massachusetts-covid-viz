import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { format } from "date-fns"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveWaffle } from "@nivo/waffle"
import { ResponsivePie } from "@nivo/pie"
import CountyMap from "../components/CountyMap"
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
  const themeProps = {
    theme: {
      tooltip: {
        container: {
          background: "#333",
        },
      },
    },
  }
  const onDateSelected = date => {
    setDailyData(compiledData[format(date, "yyyy-MM-dd")])
  }

  const dates = Object.keys(compiledData)
  const minDateString = dates[0]
  const maxDateString = dates[dates.length - 1]
  const [minDate, maxDate] = [minDateString, maxDateString].map(
    str => new Date(`${str}T00:00:00`)
  )
  const { presumptive: maxPresumptive, confirmed: maxConfirmed } = compiledData[
    maxDateString
  ].totalCases
  const maxTotalCases = maxPresumptive + maxConfirmed

  const sumCases = totalCases.presumptive + totalCases.confirmed
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MA COVID-19 Data Visualization</title>
      </Helmet>
      <div className="row">
        <div className="col-sm">
          <DateSlider
            onDateSelected={onDateSelected}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      </div>
      <div className="row panel">
        <div className="col-sm-12">
          <h2>
            {format(new Date(dailyData.date + "T00:00:00"), "MM/dd/yyyy")} -{" "}
            {sumCases} Total Cases
          </h2>
        </div>
        <div className="col-sm-6">
          <h3>{totalCases.presumptive} Presumptive Cases</h3>
        </div>
        <div className="col-sm-6">
          <h3>{totalCases.confirmed} Confirmed Cases</h3>
        </div>
        <div className="col-sm-12" style={{ minHeight: 50 }}>
          <ResponsiveBar
            data={[
              {
                state: "MA",
                ...totalCases,
              },
            ]}
            background={"#000"}
            keys={["presumptive", "confirmed"]}
            layers={["bars"]}
            indexBy="state"
            maxValue={maxTotalCases}
            layout="horizontal"
            colors={{ scheme: "nivo" }}
            {...themeProps}
          />
        </div>
      </div>
      <div className="row panel">
        <div
          className="offset-sm-0 col-sm-12 col-md-6 offset-md-3"
          style={{ maxHeight: 300, textAlign: "center" }}
        >
          &nbsp;
          <CountyMap
            align="center"
            countsByCounty={countsByCounty}
            {...themeProps}
          />
        </div>
      </div>
      <div className="row has-subpanels">
        <div className="col-sm-6 panel" style={{ maxHeight: 300 }}>
          <ResponsiveWaffle
            data={countsByGender}
            fillDirection="left"
            rows={maxTotalCases / 20 + 1}
            columns={20}
            total={maxTotalCases}
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
            {...themeProps}
          />
          <br />
        </div>
        <div
          className="col-sm-6 panel"
          style={{ textAlign: "center", maxHeight: 300 }}
        >
          <ResponsivePie
            data={countsByHospitalization}
            enableRadialLabels={false}
            width={150 + 150 * (sumCases / maxTotalCases)}
            margin={{ top: 50, bottom: 0, left: 50, right: 50 }}
            {...themeProps}
          />
          <br />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
