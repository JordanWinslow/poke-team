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
  Chip,
  Grid,
  Box
} from "@material-ui/core"
import BackIcon from "@material-ui/icons/ArrowBack"

import TeamButton from "../components/TeamButton"

import capitalizeFirstLetter from "../util/capitalizeFirstLetter"
import pokemonTypeColors from "../data/pokemonTypeColors"
import { flexbox } from "@material-ui/system"

const useStyles = makeStyles({
  backButton: {
    position: "fixed",
    left: ".5rem",
    top: ".5%",
    zIndex: "1100"
  }
})
const centered = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

const YourTeam = ({ history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { pokeTeam } = useSelector(state => state.pokeTeam)
  const { pokemon } = useSelector(state => state.pokeAPI)

  const getAvatar = name => {
    return pokemon.find(p => p.name === name).sprites.front_default
  }
  const getTypes = name => {
    const pokemonDetails = pokemon.find(p => p.name === name)
    const { types } = pokemonDetails
    return types
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
      <Grid container id="TeamGrid" style={{ marginBottom: "4rem" }}>
        {pokeTeam.length === 0 ? (
          // DISPLAY THIS IF NO POKEMON ARE FAVORITED
          <Grid item>
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
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                boxShadow: "0 0 1px rgba(0, 0, 0, 0.5)",
                width: "100%"
              }}
              key={name}
            >
              <Grid container>
                <Grid item xs={12} sm={6} lg={4}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <Avatar
                      style={{
                        height: "8rem",
                        width: "8rem",
                        cursor: "pointer"
                      }}
                      src={getAvatar(name)}
                      alt={name}
                      onClick={() => history.push("/pokemon/" + name)}
                    ></Avatar>
                    <div
                      style={
                        ({
                          width: "100%"
                        },
                        { centered })
                      }
                    >
                      {getTypes(name).map(p => {
                        let currentTypeColor = pokemonTypeColors[p.type.name]
                        return (
                          <Chip
                            style={{
                              backgroundColor: currentTypeColor,
                              color: "white",
                              margin: "0 3px",
                              width: "fit-content"
                            }}
                            size="medium"
                            label={p.type.name}
                            key={p.type.name}
                          />
                        )
                      })}
                    </div>
                  </div>
                </Grid>
                <Grid item lg={4} sm={6} xs={12} style={centered}>
                  <Typography
                    variant="h5"
                    component="h5"
                    style={{
                      cursor: "pointer"
                    }}
                    onClick={() => history.push("/pokemon/" + name)}
                  >
                    {capitalizeFirstLetter(name)}
                  </Typography>
                </Grid>
                {/*secondary={/*types*/}
                <Grid item lg={4} sm={6} xs={12} style={centered}>
                  <TeamButton
                    onTeam={true} // if they are on this page, this pokemon is definitely on their team.
                    onClick={() => dispatch(removeFromTeam(name))}
                    aria-label="remove pokemon from team"
                  />
                </Grid>
              </Grid>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  )
}

export default YourTeam
