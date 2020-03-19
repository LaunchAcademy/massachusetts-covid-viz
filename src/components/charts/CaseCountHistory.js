import React from "react"
import { ResponsiveBar } from "@nivo/bar"
import _ from "lodash"

const CaseCountHistory = ({ data, ...themeProps }) => {
  const barData = Object.values(data).map(record => {
    const cases = record.totalCases.confirmed + record.totalCases.presumptive
    return {
      date: record.date.replace("2020-", "").replace("-", "/"),
      cases,
    }
  })

  return (
    <>
      <div className="col-sm-12">
        <h2>Daily Cases</h2>
      </div>
      <div
        className="col-sm-12"
        style={{ maxHeight: 300, textAlign: "center" }}
      >
        &nbsp;
        <ResponsiveBar
          data={barData}
          indexBy="date"
          maxValue={_.maxBy(barData, "cases").cases}
          keys={["cases"]}
          layers={["bars", "axes"]}
          colors={["#800026"]}
          axisLeft={null}
          enableLabel={false}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
          }}
          {...themeProps}
          margin={{ right: 15, bottom: 70, left: 15 }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "top-middle",
              direction: "row",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  )
}

export default CaseCountHistory
