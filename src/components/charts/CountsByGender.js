import React from "react"
import { faFemale, faMale } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const iconMap = {
  female: faFemale,
  male: faMale,
}

import _ from "lodash"

const CountsByGender = ({ countsByGender }) => {
  const listItems = countsByGender.map(record => {
    return (
      <li key={record.id} className="media">
        <div className="align-self-center">
          <FontAwesomeIcon
            icon={iconMap[record.id]}
            size={"4x"}
            fixedWidth
            className="align-self-center"
          />
        </div>
        <div className="media-body">
          <strong>{record.value}</strong> {_.capitalize(record.id)}
        </div>
      </li>
    )
  })
  return <ul className="gender fa-ul">{listItems}</ul>
}

export default CountsByGender
