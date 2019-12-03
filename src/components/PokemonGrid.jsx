import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux" // useSelector grabs state similar to mapStateToProps
import {
  getFirstRender,
  getPokemonNames,
  getPokemonDetails
} from "../redux/features/pokeAPI/pokeAPISlice"

/******************STYLING****************/
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import FavoriteIcon from "@material-ui/icons/Favorite"
import AddIcon from "@material-ui/icons/Add"
import Fade from "@material-ui/core/Fade"

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

const PokemonGrid = ({ history }) => {
  const dispatch = useDispatch() // Prevents us from having to use mapDispatch & connect
  const { pokemon, nextFetchLink, totalPokemonInPokedex } = useSelector(
    state => state.pokeAPI
  ) // Destructure our state from the Redux store using a hook provided by React-Redux

  useEffect(() => {
    if (totalPokemonInPokedex === 0) {
      dispatch(getFirstRender())
    }
  }, []) // only run on first render
  const classes = useStyles() // Material UI
  return (
    <Box width="80%" margin="auto">
      <Grid container spacing={6}>
        {pokemon.map(p => {
          return (
            <Fade in={true} key={p.name}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card} align="center">
                  <CardHeader
                    action={
                      <IconButton aria-label="add to favorite pokemon">
                        <FavoriteIcon />
                      </IconButton>
                    }
                    title={p.name}
                  />
                  <CardActionArea
                    onClick={() => history.push("/pokemon/" + p.name)}
                  >
                    {p.sprites !== undefined && ( // on first render before details are fetched for each pokemon this will be undefined
                      <CardMedia
                        image={p.sprites.front_default}
                        title={`see details on ${p.name}`}
                        className={classes.media}
                      />
                    )}
                    <CardContent>
                      <Chip color="secondary" size="small" label="Grass" />
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      variant="text"
                      color="secondary"
                      startIcon={<AddIcon />}
                      aria-label="add to team"
                    >
                      Add to Team
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Fade>
          )
        })}
        <button onClick={() => dispatch(getPokemonNames(nextFetchLink))}>
          GET MORE NAMES
        </button>
        <button onClick={() => dispatch(getPokemonDetails(pokemon))}>
          GET MORE DETAILS
        </button>
      </Grid>
    </Box>
  )
}

export default PokemonGrid
