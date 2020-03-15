import React, { useState } from "react"
import { Form, Formik, Field } from "formik"
import formatDailyData from "../lib/formatDailyData"
import copy from "copy-to-clipboard"

import counties from "../../data/counties"

const DailyDataForm = props => {
  const [copiedText, setCopiedText] = useState("")
  const countyInputs = counties.map(county => {
    return (
      <div key={county}>
        <label htmlFor={`counties.${county}`}>{county}</label>
        <Field
          as="input"
          type="number"
          name={`counties.${county}`}
          id={`counties.${county}`}
        />
      </div>
    )
  })
  const countyDefaults = counties.reduce((countyProps, county) => {
    return {
      ...countyProps,
      [county]: 0,
    }
  }, {})
  return (
    <Formik
      initialValues={{
        date: "",
        totalCases: {
          confirmed: 0,
          presumptive: 0,
        },
        counties: countyDefaults,
        gender: {
          female: 0,
          male: 0,
        },
        hospitalizations: {
          hospitalized: 0,
          notHospitalized: 0,
          underInvestigation: 0,
        },
      }}
      onSubmit={(values, { setSubmitting }) => {
        const result = JSON.stringify(formatDailyData(values), null, 2)
        copy(result)
        setCopiedText("Copied.")

        setSubmitting(false)
      }}
    >
      <Form>
        <div>
          <label htmlFor="Date">Date</label>
          <Field as="input" type="date" name="date" id="date" />
        </div>
        <div>
          <label htmlFor="totalCases.confirmed">Confirmed Cases</label>
          <Field
            as="input"
            type="number"
            name="totalCases.confirmed"
            id="totalCases.confirmed"
          />
        </div>
        <div>
          <label htmlFor="totalCases.presumptive">Presumptive Positive</label>
          <Field
            as="input"
            type="number"
            name="totalCases.presumptive"
            id="totalCases.presumptive"
          />
        </div>
        {countyInputs}
        <div>
          <label htmlFor="gender.female">Female</label>
          <Field
            as="input"
            type="number"
            name="gender.female"
            id="gender.female"
          />
        </div>
        <div>
          <label htmlFor="gender.male">Male</label>
          <Field as="input" type="number" name="gender.male" id="gender.male" />
        </div>
        <div>
          <label htmlFor="hospitalizations.hospitalized">Hospitalized</label>
          <Field
            as="input"
            type="number"
            name="hospitalizations.hospitalized"
            id="hospitalizations.hospitalized"
          />
        </div>
        <div>
          <label htmlFor="hospitalizations.notHospitalized">
            Not Hospitalized
          </label>
          <Field
            as="input"
            type="number"
            name="hospitalizations.notHospitalized"
            id="hospitalizations.notHospitalized"
          />
        </div>
        <div>
          <label htmlFor="hospitalizations.underInvestigation">
            Under Investigation
          </label>
          <Field
            as="input"
            type="number"
            name="hospitalizations.underInvestigation"
            id="hospitalizations.underInvestigation"
          />
        </div>
        <div>
          <input type="submit" id="generate" value="Generate" />
          {copiedText}
        </div>
      </Form>
    </Formik>
  )
}

export default DailyDataForm
