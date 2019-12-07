import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer" // to set up infinite scrolling
import { useSelector, useDispatch } from "react-redux" // useSelector grabs state similar to mapStateToProps
import {
  getFirstRender,
  getPokemonNames,
  getPokemonDetails
} from "../redux/features/pokeAPI/pokeAPISlice"
import {
  addFavoritePokemon,
  addToTeam,
  removeFavoritePokemon,
  removeFromTeam
} from "../redux/features/pokeTeam/pokeTeamSlice"

import TeamButton from "./TeamButton" // Add and Remove From Team Button

/******************STYLING****************/
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Fade from "@material-ui/core/Fade"
/******************STYLING****************/

import pokemonTypeColors from "../data/pokemonTypeColors" // for displaying the appropriate bg color for each type
import capitalizeFirstLetter from "../util/capitalizeFirstLetter"
import FavoriteButton from "./FavoriteButton"

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    margin: "auto"
  },
  media: {
    height: 200,
    width: 200
  }
})

const PokemonGrid = ({ history, location }) => {
  const dispatch = useDispatch() // Prevents us from having to use mapDispatch & connect
  // Destructure our state from the Redux store using a hook provided by React-Redux
  const { pokemon, nextFetchLink, totalPokemonInPokedex } = useSelector(
    state => state.pokeAPI
  )
  const { pokeTeam, favoritePokemon } = useSelector(state => state.pokeTeam)

  useEffect(() => {
    if (totalPokemonInPokedex === 0) {
      dispatch(getFirstRender())
    }
    if (location.state) {
      /* 
      IF THE USER WAS LOOKING AT POKEMON DETAILS AND THEY CLICK BACK, WE WANT IT TO SCROLL TO THE POKEMON THEY WERE LOOKING AT INSTEAD OF STARTING AT THE TOP OF THE PAGE.
      BY PASSING AN OBJECT WITH A <Link> COMPONENT INSTEAD OF JUST A PATH, WE CAN SEND THIS COMPONENT THE NAME OF THE POKEMON THEY WERE LOOKING AT.
      WE CAN THEN USE THAT NAME TO SELECT THE APPROPRIATE ID CORRESPONDING TO THE GRID ITEM WITH THE POKEMON THEY WERE LOOKING AT, AND USE 
      scrollIntoView() TO AUTOMATICALLY SCROLL THERE!
      */
      const pokemonLocation = location.state
      document.getElementById(pokemonLocation).scrollIntoView()
    }
  }, []) // only run on first render

  const classes = useStyles() // Material UI

  const [bottomRef, bottomInView] = useInView({
    // FOR CALCULATING END OF PAGE AND LOADING MORE POKEMON
    triggerOnce: false
  })

  return (
    <Box width="80%" margin="3rem auto">
      <Grid container spacing={6}>
        {/******BEGIN MAPPING POKEMON TO GRID CARDS******/}
        {pokemon.map(p => {
          return (
            <Fade in={true} key={p.name}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card id={p.name} className={classes.card} align="center">
                  <CardHeader
                    action={
                      <FavoriteButton
                        isFavorited={favoritePokemon.includes(p.name)}
                        onClick={() =>
                          favoritePokemon.includes(p.name)
                            ? dispatch(removeFavoritePokemon(p.name))
                            : dispatch(addFavoritePokemon(p.name))
                        }
                      />
                    }
                    title={capitalizeFirstLetter(p.name)}
                  />

                  {/******BEGIN POKEMON IMAGE SECTION******/}
                  <CardActionArea
                    onClick={() => history.push("/pokemon/" + p.name)}
                  >
                    {p.sprites !== undefined && ( // on first render before details are fetched for each pokemon this will be undefined and we will omit rendering the sprites and types sections below
                      <CardMedia
                        image={p.sprites.front_default}
                        title={`see details on ${p.name}`}
                        className={classes.media}
                      />
                    ) /******END POKEMON IMAGE SECTION******/}
                    {p.types !== undefined && (
                      /******BEGIN POKEMON TYPES SECTION******/
                      <CardContent>
                        {p.types.map(p => {
                          let currentTypeColor = pokemonTypeColors[p.type.name]
                          return (
                            <Chip
                              style={{
                                backgroundColor: currentTypeColor,
                                color: "white",
                                margin: "0 3px"
                              }}
                              size="medium"
                              label={p.type.name}
                              key={p.type.name}
                            />
                          )
                        })}
                      </CardContent>
                      /******END POKEMON TYPES SECTION******/
                    )}
                  </CardActionArea>

                  {/******BEGIN CARD FOOTER SECTION******/}
                  <TeamButton
                    onTeam={pokeTeam.includes(p.name)}
                    onClick={() =>
                      pokeTeam.includes(p.name)
                        ? dispatch(removeFromTeam(p.name))
                        : dispatch(addToTeam(p.name))
                    }
                  />
                  {/******END CARD FOOTER SECTION******/}
                </Card>
                <div ref={bottomRef}>
                  {bottomInView &&
                    console.log("BOTTOM OF PAGE REACHED") /*TODO*/}
                </div>
              </Grid>
            </Fade>
          )
        })}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "3rem"
          }}
        >
          <button onClick={() => dispatch(getPokemonNames(nextFetchLink))}>
            GET MORE NAMES
          </button>
          <button onClick={() => dispatch(getPokemonDetails(pokemon))}>
            GET MORE DETAILS
          </button>
        </div>
      </Grid>
    </Box>
  )
}

export default PokemonGrid
