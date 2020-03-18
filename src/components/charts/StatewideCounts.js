import React from "react"
import { format } from "date-fns"
import { ResponsiveBar } from "@nivo/bar"
import pluralize from "pluralize"
const StatewideCounts = ({ date, data, maxTotalCases, themeProps }) => {
  const { presumptive, confirmed } = data
  const sumCases = presumptive + confirmed
  return (
    <>
      <div className="col-sm-12 case-summary">
        <h4>Total Cases as of {format(date, "MM/dd/yyyy")}</h4>
        <h2>
          <strong>{sumCases}</strong>
        </h2>
      </div>
      <div className="col-sm-6 case-summary">
        <h3>
          <strong>{presumptive}</strong> Presumptive{" "}
          {pluralize("Case", presumptive)}
        </h3>
      </div>
      <div className="col-sm-6 case-summary">
        <h3>
          <strong>{confirmed}</strong> Confirmed {pluralize("Case", confirmed)}
        </h3>
      </div>
      <div className="col-sm-12" style={{ minHeight: 50 }}>
        <ResponsiveBar
          data={[
            {
              state: "MA",
              ...data,
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
    </>
  )
}

export default StatewideCounts
