import React from "react"
import { ResponsiveChoropleth } from "@nivo/geo"

import countyData from "../../data/mapbox.json"

const CountyMap = props => {
  const { countsByCounty } = props
  return (
    <div style={{ width: 400, height: 300, textAlign: "center" }}>
      <ResponsiveChoropleth
        features={countyData.features}
        height={300}
        colors="YlOrRd"
        data={countsByCounty.map(record => {
          return { id: record.county, value: record.caseCount }
        })}
        domain={[0, 50]}
        projectionRotation={[73, 0, 0]}
        projectionTranslation={[0.12, 15.4]}
        projectionScale={5500}
        enableGraticule={false}
        borderWidth={0.5}
      />
    </div>
  )
}

export default CountyMap
