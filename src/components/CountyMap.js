import React from "react"
import { ResponsiveChoropleth } from "@nivo/geo"

import countyData from "../../data/mapbox.json"
import counties from "../../data/counties"

const CountyMap = props => {
  const { countsByCounty, theme = {} } = props
  const countiesInData = countsByCounty.map(record => {
    return record.county
  }, [])
  const records = countsByCounty.map(record => {
    return { id: record.county, value: record.caseCount }
  })

  // const countiesNotInData = _.difference(counties, countiesInData)
  // const zeroedRecords = countiesNotInData.reduce((records, county) => {
  //   return [
  //     ...records,
  //     { id: county, value: 0, backgroundColor: "#aaa", color: "#aaa" },
  //   ]
  // }, [])
  return (
    <div style={{ width: 400, height: 225, textAlign: "center" }}>
      <ResponsiveChoropleth
        features={countyData.features}
        height={300}
        colors="YlOrRd"
        data={records}
        domain={[0, 50]}
        projectionRotation={[73, 0, 0]}
        projectionTranslation={[0.13, 15.2]}
        projectionScale={5500}
        enableGraticule={false}
        borderWidth={0.5}
        theme={theme}
      />
    </div>
  )
}

export default CountyMap
