import {
  ADD_FAVORITE_POKEMON,
  REMOVE_FAVORITE_POKEMON,
  ADD_TO_TEAM,
  REMOVE_FROM_TEAM
} from "../constants"

const pokeTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FAVORITE_POKEMON:
      return {
        ...state,
        favoritePokemon: [...state.favoritePokemon, action.pokemonName]
      }
    case REMOVE_FAVORITE_POKEMON:
      return {
        ...state,
        favoritePokemon: state.favoritePokemon.filter(
          pokemon => pokemon !== action.pokemonName // returns a new array with the filtered pokemon removed
        )
      }
    case ADD_TO_TEAM:
      return {
        ...state,
        pokeTeam: [...state.pokeTeam, action.pokemonName]
      }
    case REMOVE_FROM_TEAM:
      return {
        ...state,
        pokeTeam: state.pokeTeam.filter(
          pokemon => pokemon !== action.pokemonName // returns a new array with the filtered pokemon removed
        )
      }
    default:
      return state
  }
}

export default pokeTeamReducer
