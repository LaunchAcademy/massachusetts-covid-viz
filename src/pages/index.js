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
        <div className="col-sm" style={{ minHeight: 50 }}>
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
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            layout="horizontal"
            colors={{ scheme: "nivo" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <h2>By County</h2>
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
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            layout="horizontal"
            anchor="center"
            colors={{ scheme: "nivo" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <h2>By Gender</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-sm" style={{ maxHeight: 300 }}>
          <ResponsiveWaffle
            data={countsByGender}
            total={92}
            rows={5}
            columns={10}
          />
          <br />
        </div>
      </div>

      <div className="row">
        <div className="col-sm">
          <h2>Hospitalizations</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm" style={{ maxHeight: 300 }}>
          <ResponsivePie data={countsByHospitalization} innerRadius={0.5} />
          <br />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
