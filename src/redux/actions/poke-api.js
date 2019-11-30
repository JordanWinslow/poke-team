// THIS FILE CONTAINS ALL pokeAPI ACTION CREATORS FOR API INTERACTION
import {
  GET_FIRST_RENDER,
  GET_POKEMON_NAMES,
  GET_POKEMON_DETAILS,
  API_ERROR
} from "../constants"

const apiError = errorMessage => {
  return { type: API_ERROR, message: errorMessage }
}

const getFirstRender = () => {
  return async dispatch => {
    // redux-thunk
    try {
      const apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon") // fetches 20 pokemon names, nextFetchLink and totalPokemonInPokedex
      const firstRenderData = await apiResponse.json()
      dispatch({ type: GET_FIRST_RENDER, firstRenderData })
      dispatch(getPokemonDetails(firstRenderData.results))
    } catch (e) {
      apiError(e.message)
    }
  }
}

const getPokemonDetails = pokemon => {
  // takes the entire array of pokemon from state or whatever array we pass it
  return async dispatch => {
    try {
      // redux-thunk
      pokemon.forEach(async (currentPokemon, index) => {
        if (currentPokemon.id === undefined) {
          // if it does not have an ID then it hasn't been fetched yet
          const apiResponse = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + currentPokemon.name
          )
          const {
            id,
            abilities,
            height,
            weight,
            sprites,
            stats,
            types
          } = await apiResponse.json()
          const details = {
            id,
            abilities,
            height,
            weight,
            sprites,
            stats,
            types
          }
          dispatch({
            type: GET_POKEMON_DETAILS,
            payload: { index, details }
          })
        }
      })
    } catch (e) {
      apiError(e.message)
    }
  }
}

const getPokemonNames = nextFetchLink => {
  /* nextFetchLink is a string in our state which has an offset and a limit which 
      determines how many pokemon we fetch from the API at once, as well as where we 
      begin our fetch. For example offset=100&limit=50 begins our fetch at the 100th 
      pokemon and fetches the next 50 pokemon. */
  const link = nextFetchLink
  return async dispatch => {
    // redux-thunk
    try {
      const apiResponse = await fetch(link)
      const apiData = await apiResponse.json()
      const nextFetchLink = apiData.next // update the link for possible future api request
      const pokemon = apiData.results // this is an array containing the names and urls for a number of pokemon === to the "limit" set by nextFetchLink
      dispatch({ type: GET_POKEMON_NAMES, payload: { nextFetchLink, pokemon } })
    } catch (e) {
      apiError(e.message)
    }
  }
}

export { getFirstRender, getPokemonNames, getPokemonDetails }
