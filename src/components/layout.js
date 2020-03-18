/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import NavLinkList from "./NavLinkList"
import Octicon, { Heart } from "@primer/octicons-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"

import "./layout.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      file(relativePath: { eq: "launch-logo-reversed.png" }) {
        childImageSharp {
          fixed(width: 64, height: 64) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const footerIconSize = "2x"

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarTogglerDemo01"
        >
          <a className="navbar-brand mr-auto" href="#">
            <span class="navbar-brand mb-0 h1">
              Massachusetts COVID-19 Tracker
            </span>
          </a>
          <NavLinkList />
        </div>
      </nav>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          <h4>
            Made with <Octicon icon={Heart} size="medium" /> for Boston while
            social distancing.
          </h4>
          <p>
            Data is updated daily and source from the{" "}
            <a href="https://www.mass.gov/orgs/department-of-public-health">
              Massachusetts DPH
            </a>
          </p>
          <p>
            You can{" "}
            <a href="https://launchacademy.com/campus/">learn to code apps</a>{" "}
            like this, too. Study with us and launch a rewarding,
            work-from-home-friendly career!
          </p>

          <ul class="social">
            <li>
              <a href="https://instagram.com/launchacademy">
                <FontAwesomeIcon icon={faInstagram} size={footerIconSize} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/launchacademy">
                <FontAwesomeIcon icon={faTwitter} size={footerIconSize} />
              </a>
            </li>
            <li>
              <a href="https://launchacademy.com">
                <Img
                  fixed={data.file.childImageSharp.fixed}
                  size={footerIconSize}
                />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCV9y37nUk5aQH_uNRGEtKZw">
                <FontAwesomeIcon icon={faYoutube} size={footerIconSize} />
              </a>
            </li>
            <li>
              <a href="https://facebook.com/TheLaunchAcademy">
                <FontAwesomeIcon icon={faFacebook} size={footerIconSize} />
              </a>
            </li>
          </ul>
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://launchacademy.com">Launch Academy</a>
          </p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
