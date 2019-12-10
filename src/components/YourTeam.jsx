import React from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { removeFromTeam } from "../redux/features/pokeTeam/pokeTeamSlice"

import { makeStyles } from "@material-ui/core/styles"
import {
  Typography,
  Avatar,
  Fab,
  Card,
  CardHeader,
  IconButton,
  Grid,
  Box
} from "@material-ui/core"
import BackIcon from "@material-ui/icons/ArrowBack"

import TeamButton from "../components/TeamButton"

import capitalizeFirstLetter from "../util/capitalizeFirstLetter"

const useStyles = makeStyles({
  backButton: {
    position: "fixed",
    left: ".5rem",
    top: ".5%",
    zIndex: "1100"
  }
})

const YourTeam = ({ history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { pokeTeam } = useSelector(state => state.pokeTeam)
  const { pokemon } = useSelector(state => state.pokeAPI)

  const getAvatar = name => {
    return pokemon.find(p => p.name === name).sprites.front_default
  }

  return (
    <Box>
      <Link to="/">
        <Fab
          color="secondary"
          aria-label="back to homepage"
          className={classes.backButton}
        >
          <BackIcon />
        </Fab>
      </Link>
      <Grid container>
        {pokeTeam.length === 0 ? (
          // DISPLAY THIS IF NO POKEMON ARE FAVORITED
          <Grid item style={{ margin: "25%" }}>
            <Typography variant="h5" component="h2">
              You Have Not Added Any Pokemon To Your Team Yet.
            </Typography>
          </Grid>
        ) : (
          // DISPLAY THIS IF THERE ARE ANY POKEMON IN THE LIST
          pokeTeam.map(name => (
            <Grid
              item
              sm={12}
              md={6}
              style={{
                padding: "1rem",
                height: "6rem",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                boxShadow: "0 0 1px rgba(0, 0, 0, 0.5)",
                width: "100%"
              }}
              key={name}
            >
              <Avatar
                style={{
                  height: "4rem",
                  width: "4rem",
                  cursor: "pointer"
                }}
                src={getAvatar(name)}
                className="fullSizeAvatar" // index.css
                alt={name}
                onClick={() => history.push("/pokemon/" + name)}
              ></Avatar>
              <Typography
                variant="h6"
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/pokemon/" + name)}
              >
                {capitalizeFirstLetter(name)}
              </Typography>
              {/*secondary={/*types*/}
              <TeamButton
                onTeam={true} // if they are on this page, this pokemon is definitely on their team.
                onClick={() => dispatch(removeFromTeam(name))}
                aria-label="remove pokemon from team"
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  )
}

export default YourTeam
