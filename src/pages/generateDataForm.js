import React from "react"
import Layout from "../components/layout"
import DailyDataForm from "../components/DailyDataForm"

const GenerateDataForm = props => {
  return (
    <Layout>
      <h1>Generate a Data Set</h1>
      <DailyDataForm />
    </Layout>
  )
}

export default GenerateDataForm
