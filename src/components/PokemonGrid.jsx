/******************CORE IMPORTS****************/
import React, { useEffect } from "react"
import { InView } from "react-intersection-observer" // to set up infinite scrolling
import { useSelector, useDispatch } from "react-redux" // useSelector grabs state similar to mapStateToProps

/******************STATE & DISPATCH IMPORTS****************/
import {
  getFirstRender,
  getMorePokemon
} from "../redux/features/pokeAPI/pokeAPISlice"
import {
  addFavoritePokemon,
  addToTeam,
  removeFavoritePokemon,
  removeFromTeam
} from "../redux/features/pokeTeam/pokeTeamSlice"

/******************STYLE & THEME IMPORTS****************/
import { makeStyles } from "@material-ui/core/styles"
import {
  Box,
  Grid,
  Chip,
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade
} from "@material-ui/core"

/******************MODULAR COMPONENT IMPORTS****************/
import useDebounce from "../util/useDebounce" // Used for infinite scrolling (prevents running more than one API request at a time)
import TeamButton from "./TeamButton" // Add and Remove From Team Button
import FavoriteButton from "./FavoriteButton" // Add and Remove From Favorites Button

/******************UTILITIES****************/
import pokemonTypeColors from "../data/pokemonTypeColors" // for displaying the appropriate bg color for each type
import capitalizeFirstLetter from "../util/capitalizeFirstLetter"

/******************IMAGES****************/
import Loading from "../images/Loading.gif"
import Loading2 from "../images/Loading2.gif"

/******************LOCAL STYLES****************/
const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    margin: "auto"
  },
  media: {
    height: 150,
    width: 150
  }
})

/******************BEGIN POKEMON GRID COMPONENT****************/
const PokemonGrid = ({ history, location }) => {
  const dispatch = useDispatch() // Prevents us from having to use mapDispatch & connect

  const {
    // Destructure our state from the Redux store using a hook provided by React-Redux
    loading,
    pokemon,
    nextFetchLink,
    totalPokemonInPokedex
  } = useSelector(state => state.pokeAPI)
  const { pokeTeam, favoritePokemon } = useSelector(state => state.pokeTeam)

  useEffect(() => {
    if (totalPokemonInPokedex === 0) {
      dispatch(getFirstRender())
    }
    if (location.state) {
      /* 
      Scroll to position of the pokemon they were just looking at in the details page. When they click the back button,
      location.state is populated with the name of the pokemon so we may use it to scroll to that element by ID.
      */
      const pokemonLocation = location.state
      document.getElementById(pokemonLocation).scrollIntoView()
    }
  }, []) // array ensures we only run on first render to prevent infinite loops.

  const classes = useStyles() // Material UI

  const getPokemon = useDebounce(link => {
    console.log("BOTTOM OF PAGE REACHED.\nGETTING MORE POKEMON")
    dispatch(getMorePokemon(link))
  }, 1000) // prevent 20 API requests by debouncing and dispatch only one API request each time we hit bottom of page

  /******************RENDER****************/
  return (
    <Box
      width="80%"
      margin={window.innerWidth < 500 ? "2rem auto" : "3rem auto"}
    >
      <Grid container spacing={window.innerWidth < 500 ? 2 : 6}>
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
                        image={loading ? Loading2 : p.sprites.front_default}
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
                    maxSizeReached={pokeTeam.length === 8}
                    onClick={() =>
                      pokeTeam.includes(p.name)
                        ? dispatch(removeFromTeam(p.name))
                        : dispatch(addToTeam(p.name))
                    }
                  />
                  {/******END CARD FOOTER SECTION******/}
                </Card>
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
          {!loading && ( // if state.loading is active, we are performing API requests and do not want this component to trigger or display.
            // otherwise it will continually load pokemon from the API even if the user isn't at the bottom of the page.
            <InView
              as="div"
              onChange={inView => {
                if (inView) {
                  // this is a property of the react-intersection-observer library and prevents this component from triggering except when it is fully in view.
                  getPokemon(nextFetchLink)
                }
              }}
            >
              <img
                src={Loading}
                alt="Mew Loading Animation"
                style={{ width: "200px" }}
              />
            </InView>
          )}
        </div>
      </Grid>
    </Box>
  )
}

export default PokemonGrid
