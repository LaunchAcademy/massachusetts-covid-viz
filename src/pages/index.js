import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveWaffle } from "@nivo/waffle"
import { ResponsivePie } from "@nivo/pie"
import { Helmet } from "react-helmet"

const IndexPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MA COVID-19 Data Visualization</title>
      </Helmet>
      <div className="row">
        <div className="col-sm" style={{ minHeight: 50 }}>
          <ResponsiveBar
            data={[
              {
                state: "MA",
                presumptive: 91,
                confirmed: 1,
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
            data={[
              {
                county: "Barnstable",
                caseCount: 0,
              },
              {
                county: "Berkshire",
                caseCount: 7,
              },
              { county: "Bristol", caseCount: 0 },
              { county: "Dukes", caseCount: 0 },
              { county: "Essex", caseCount: 1 },
              { county: "Franklin", caseCount: 0 },
              { county: "Hampden", caseCount: 0 },
              { county: "Hampshire", caseCount: 0 },
              { county: "Middlesex", caseCount: 41 },
              { county: "Nantucket", caseCount: 0 },
              { county: "Norfolk", caseCount: 22 },
              { county: "Plymouth", caseCount: 0 },
              { county: "Suffolk", caseCount: 20 },
              { county: "Worcester", caseCount: 1 },
              { county: "Unknown", caseCount: 0 },
            ].filter(record => record.caseCount > 0)}
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
            data={[
              {
                id: "male",
                label: "male",
                value: 40,
                color: "#468df3",
              },
              {
                id: "female",
                label: "female",
                value: 52,
                color: "#ba72ff",
              },
            ]}
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
          <ResponsivePie
            data={[
              {
                id: "hospitalized",
                label: "hospitalized",
                value: 6,
              },
              {
                id: "notHospitalized",
                label: "Not Hospitalized",
                value: 62,
              },
              {
                id: "underInvestigation",
                label: "Under Investigation",
                value: 24,
              },
            ]}
            innerRadius={0.5}
          />
          <br />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
