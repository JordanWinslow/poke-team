import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

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

import { removeFavoritePokemon } from "../redux/features/pokeTeam/pokeTeamSlice"

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
        id="FavoritesList"
        container
        sm={12}
        md={8}
        lg={6}
        style={{ overflowY: "scroll", margin: "3rem 0" }}
      >
        <Card>
          <CardHeader
            action={
              <IconButton aria-label="close favorites menu">
                <CloseIcon onClick={() => history.goBack()} />
              </IconButton>
            }
            title="Favorite Pokemon"
          />
          <Grid container>
            {favoritePokemon.map(name => (
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
            ))}
          </Grid>
        </Card>
      </Grid>
    </Box>
  )
}

export default ListFavoritePokemon
