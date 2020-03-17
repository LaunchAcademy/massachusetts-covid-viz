import React from "react"
import { ResponsiveChoropleth } from "@nivo/geo"

import countyData from "../../data/mapbox.json"

const CountyMap = props => {
  const { countsByCounty, theme = {} } = props
  return (
    <div style={{ width: 400, height: 225, textAlign: "center" }}>
      <ResponsiveChoropleth
        features={countyData.features}
        height={300}
        colors="YlOrRd"
        data={countsByCounty.map(record => {
          return { id: record.county, value: record.caseCount }
        })}
        domain={[0, 50]}
        projectionRotation={[73, 0, 0]}
        projectionTranslation={[0.23, 15.2]}
        projectionScale={5500}
        enableGraticule={false}
        borderWidth={0.5}
        theme={theme}
      />
    </div>
  )
}

export default CountyMap
