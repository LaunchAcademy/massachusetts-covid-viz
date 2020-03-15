const formatCountyData = countyPayload => {
  return Object.keys(countyPayload).reduce((countyList, countyName) => {
    if (countyPayload[countyName] > 0) {
      return [
        ...countyList,
        {
          county: countyName,
          caseCount: countyPayload[countyName],
        },
      ]
    }

    return countyList
  }, [])
}

const formatGender = genderPayload => {
  return Object.keys(genderPayload).reduce((genderList, genderName) => {
    return [
      ...genderList,
      {
        id: genderName,
        label: genderName,
        value: genderPayload[genderName],
      },
    ]
  }, [])
}

const formatHospitalizations = hospitalPayload => {
  return Object.keys(hospitalPayload).reduce((hospitalList, statusName) => {
    return [
      ...hospitalList,
      {
        id: statusName,
        label: statusName,
        value: hospitalPayload[statusName],
      },
    ]
  }, [])
}
const formatDailyData = formPayload => {
  const { totalCases, date } = formPayload

  return {
    date,
    totalCases,
    countsByCounty: formatCountyData(formPayload.counties),
    countsByGender: formatGender(formPayload.gender),
    countsByHospitalization: formatHospitalizations(
      formPayload.hospitalizations
    ),
  }
}

export default formatDailyData
