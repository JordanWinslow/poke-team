import React from "react"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import GitHubIcon from "@material-ui/icons/GitHub"

const Header = () => {
  return (
    <AppBar position="relative" style={{ padding: "1rem 0" }}>
      <Toolbar>
        <Typography variant="h6" component="h1">
          PokéTeam
        </Typography>
        <IconButton
          style={{
            position: "absolute",
            right: "1.5rem"
          }}
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
