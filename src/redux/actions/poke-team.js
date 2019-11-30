import {
  ADD_FAVORITE_POKEMON,
  REMOVE_FAVORITE_POKEMON,
  ADD_TO_TEAM,
  REMOVE_FROM_TEAM
} from "../constants"

const addFavoritePokemon = pokemonName => {
  return { type: ADD_FAVORITE_POKEMON, pokemonName }
}

const removeFavoritePokemon = pokemonName => {
  return { type: REMOVE_FAVORITE_POKEMON, pokemonName }
}

const addToTeam = pokemonName => {
  return { type: ADD_TO_TEAM, pokemonName }
}

const removeFromTeam = pokemonName => {
  return { type: REMOVE_FROM_TEAM, pokemonName }
}

export { addFavoritePokemon, removeFavoritePokemon, addToTeam, removeFromTeam }
