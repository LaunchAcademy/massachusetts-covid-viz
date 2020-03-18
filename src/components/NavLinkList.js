import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Octicon, { MarkGithub } from "@primer/octicons-react"

export default props => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "launch-logo-reversed.png" }) {
        childImageSharp {
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <a
          className="nav-link d-none d-sm-block"
          href="https://github.com/LaunchAcademy/massachusetts-covid-viz"
        >
          <Octicon icon={MarkGithub} size="medium" />
        </a>
      </li>
      <li className="nav-item d-sm-inline-block">
        <a className="nav-link" href="https://launchacademy.com">
          <Img fixed={data.file.childImageSharp.fixed} />
        </a>
      </li>
    </ul>
  )
}
