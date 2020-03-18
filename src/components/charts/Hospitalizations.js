import React from "react"
import { faFirstAid, faHome, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const humanFriendlyMap = {
  hospitalized: "Hospitalized",
  notHospitalized: "Not Hospitalized",
  underInvestigation: "Under Investigation",
}

const iconMap = {
  hospitalized: faFirstAid,
  notHospitalized: faHome,
  underInvestigation: faSearch,
}

const Hospitalizations = ({ data }) => {
  const listItems = data.map(record => {
    return (
      <li key={record.id}>
        <FontAwesomeIcon icon={iconMap[record.id]} size={"4x"} fixedWidth />
        <span>
          <strong>{record.value}</strong> {humanFriendlyMap[record.id]}
        </span>
      </li>
    )
  })
  return <ul className="hospitalizations fa-ul">{listItems}</ul>
}

export default Hospitalizations
