import React from "react"
import { Link } from "react-router-dom"

import styled from "@material-ui/core/styles/styled"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import GitHubIcon from "@material-ui/icons/GitHub"

import AppLogo from "../images/AppLogo.svg"

const HeaderContainer = styled(AppBar)({
  background:
    "linear-gradient(90deg, rgba(255, 123, 123, 1), rgba(255, 172, 164, 1))"
})

const Header = () => {
  return (
    <HeaderContainer position="relative">
      <Toolbar>
        <Link to="/" style={{ position: "relative", left: "-1rem" }}>
          <IconButton>
            <img
              src={AppLogo}
              alt="PokeTeam Logo by Jordan Winslow"
              style={{ width: "2.5rem" }}
            />
          </IconButton>
        </Link>
        <Typography variant="h6" component="h1">
          PokéTeam
        </Typography>
        <a
          href="https://github.com/jordanwinslow/poke-team"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            right: "1.5rem"
          }}
        >
          <IconButton>
            <GitHubIcon fontSize="large" />
          </IconButton>
        </a>
      </Toolbar>
    </HeaderContainer>
  )
}

export default Header
