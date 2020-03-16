import React, { useState, useEffect } from "react"
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider"
import { SliderRail, KeyboardHandle, Track, Tick } from "./vendor/dateSlider" // example render components - source below
import { startOfDay, differenceInCalendarDays, format } from "date-fns"
import { scaleTime } from "d3-scale"

const sliderStyle = {
  position: "relative",
  width: "100%",
}

function formatTick(ms) {
  return format(new Date(ms), "MMM dd")
}

const DateSlider = props => {
  const dayStep = 1000 * 60 * 60 * 24

  const minDate = startOfDay(new Date(2020, 2, 10))
  const maxDate = startOfDay(new Date(2020, 2, 15))

  const [dateSelected, setDateSelected] = useState(maxDate)

  const onUpdate = ([ms]) => {
    //triggers a known issue: https://github.com/sghall/react-compound-slider/issues/110 - dealing with the warning for now
    setDateSelected(new Date(ms))
  }

  const dateTicks = scaleTime()
    .domain([minDate, maxDate])
    .ticks(differenceInCalendarDays(maxDate, minDate))
    .map(d => +d)

  useEffect(() => {
    if (props.onDateSelected) {
      props.onDateSelected(dateSelected)
    }
  }, [dateSelected, props])

  return (
    <div style={{ marginTop: 60, height: 60, width: "90%" }}>
      <Slider
        mode={1}
        step={dayStep}
        domain={[+minDate, +maxDate]}
        rootStyle={sliderStyle}
        onChange={onUpdate}
        values={[+dateSelected]}
      >
        <Rail>
          {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div>
              {handles.map(handle => (
                <KeyboardHandle
                  key={handle.id}
                  handle={handle}
                  domain={[+minDate, +maxDate]}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks right={false}>
          {({ tracks, getTrackProps }) => (
            <div>
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks values={dateTicks}>
          {({ ticks }) => (
            <div>
              {ticks.map(tick => (
                <Tick
                  key={tick.id}
                  tick={tick}
                  count={ticks.length}
                  format={formatTick}
                />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  )
}
export default DateSlider
