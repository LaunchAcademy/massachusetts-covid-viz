#!/usr/bin/env node

const fs = require("fs")
const fg = require("fast-glob")

const path = require("path")
fg(path.join(__dirname, "../data/dailies/*.json")).then(entries => {
  const compiledResults = {}
  for (const filePath of entries) {
    const fileContents = JSON.parse(fs.readFileSync(filePath))
    compiledResults[fileContents.date] = fileContents
  }

  fs.writeFileSync(
    path.join(__dirname, "../data/dist/compiledData.json"),
    JSON.stringify(compiledResults, null, 2)
  )
})
