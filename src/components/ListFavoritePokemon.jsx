import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { removeFavoritePokemon } from "../redux/features/pokeTeam/pokeTeamSlice"

import {
  Typography,
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Grid,
  Box
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

import FavoriteButton from "../components/FavoriteButton"

import capitalizeFirstLetter from "../util/capitalizeFirstLetter"

const ListFavoritePokemon = ({ history }) => {
  const dispatch = useDispatch()
  const { favoritePokemon } = useSelector(state => state.pokeTeam)
  const { pokemon } = useSelector(state => state.pokeAPI)
  const getAvatar = name => {
    return pokemon.find(p => p.name === name).sprites.front_default
  }
  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        zIndex: 9999,
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Grid
        item
        sm={12}
        md={8}
        lg={6}
        style={{
          position: "fixed",
          zIndex: "999",
          width: "100%",
          marginTop: window.innerWidth < 600 ? "0" : "1rem"
        }}
      >
        <Card>
          <CardHeader
            action={
              <IconButton
                aria-label="close favorites menu"
                onClick={() => history.goBack()}
              >
                <CloseIcon />
              </IconButton>
            }
            title="Favorite Pokemon"
          />
        </Card>
      </Grid>
      <Grid
        id="FavoritesList"
        item
        sm={12}
        md={8}
        lg={6}
        style={{
          overflowY: "scroll",
          margin: window.innerWidth < 600 ? "4rem 0 0 0" : "5rem 0 2rem 0",
          boxShadow: "0 0px 20px rgba(0, 0, 0, 0.5)"
        }}
      >
        <Card>
          {/*</div>*/}
          <Grid container>
            {favoritePokemon.length === 0 ? (
              // DISPLAY THIS IF NO POKEMON ARE FAVORITED
              <Grid item style={{ margin: "25%" }}>
                <Typography variant="h5" component="h2">
                  You Have Not Favorited Any Pokemon Yet.
                </Typography>
              </Grid>
            ) : (
              // DISPLAY THIS IF THERE ARE ANY POKEMON IN THE LIST
              favoritePokemon.map(name => (
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
                  <FavoriteButton
                    isFavorited={true}
                    onClick={() => dispatch(removeFavoritePokemon(name))}
                    aria-label="remove pokemon from favorites"
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Card>
      </Grid>
    </Box>
  )
}

export default ListFavoritePokemon
