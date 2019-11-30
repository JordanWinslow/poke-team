import {
  GET_FIRST_RENDER,
  GET_POKEMON_NAMES,
  GET_POKEMON_DETAILS,
  API_ERROR
} from "../constants"

const pokeAPIReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FIRST_RENDER:
      const { count, next, results } = action.firstRenderData
      return {
        ...state,
        totalPokemonInPokedex: count,
        nextFetchLink: next,
        pokemon: results // not sure about this
      }
    case GET_POKEMON_NAMES:
      const { nextFetchLink, pokemon } = action.payload
      const newPokemonArray = [...state.pokemon, ...pokemon]
      return {
        ...state,
        nextFetchLink,
        pokemon: newPokemonArray
      }
    case GET_POKEMON_DETAILS:
      const { index, details } = action.payload
      const originalPokemon = state.pokemon[index]
      const updatedPokemon = { ...originalPokemon, ...details }
      const newArray = [...state.pokemon]
      newArray[index] = updatedPokemon
      return {
        ...state,
        pokemon: newArray
      }
    case API_ERROR:
      return alert(action.message)
    default:
      return state
  }
}

export default pokeAPIReducer
