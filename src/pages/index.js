import React, { useState } from "react"

import { format, parse } from "date-fns"
import { ResponsiveWaffle } from "@nivo/waffle"
import { ResponsivePie } from "@nivo/pie"
import SEO from "../components/seo"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import StatewideCounts from "../components/charts/StatewideCounts"
import Hospitalizations from "../components/charts/Hospitalizations"
import CountyMap from "../components/CountyMap"
import compiledData from "../../data/dist/compiledData.json"
import DateSlider from "../components/DateSlider"
import CaseCountHistory from "../components/charts/CaseCountHistory"
import CountsByGender from "../components/charts/CountsByGender"

const dateFormat = "yyyy-MM-dd"
const now = new Date()

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
      textColor: "#fff",
      tooltip: {
        container: {
          background: "#333",
        },
      },
    },
  }
  const onDateSelected = date => {
    if (date) {
      const formattedDate = format(date, dateFormat)
      setDailyData(compiledData[formattedDate])
    }
  }

  const dates = Object.keys(compiledData)
  const minDateString = dates[0]
  const maxDateString = dates[dates.length - 1]
  const [minDate, maxDate] = [minDateString, maxDateString].map(str =>
    parse(str, dateFormat, now)
  )
  const { presumptive: maxPresumptive, confirmed: maxConfirmed } = compiledData[
    maxDateString
  ].totalCases
  const maxTotalCases = maxPresumptive + maxConfirmed
  const selectedDate = parse(`${dailyData.date}`, dateFormat, now)

  return (
    <Layout>
      <SEO />
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
        <StatewideCounts
          data={dailyData.totalCases}
          date={selectedDate}
          maxTotalCases={maxTotalCases}
          {...themeProps}
        />
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
        <div className="col-sm-6 panel" style={{ maxHeight: 350 }}>
          <CountsByGender countsByGender={countsByGender} />
          <br />
        </div>
        <div
          className="col-sm-6 panel"
          style={{ textAlign: "center", maxHeight: 350 }}
        >
          <Hospitalizations
            data={countsByHospitalization}
            maxTotalCases={maxTotalCases}
          />
          <br />
        </div>
      </div>
      <div className="row panel">
        <CaseCountHistory data={compiledData} {...themeProps} />
      </div>
    </Layout>
  )
}

export default IndexPage
