import { createSlice } from "@reduxjs/toolkit"

const pokeTeamSlice = createSlice({
  name: "pokeTeam",
  initialState: {
    pokeTeam: [], // An array of pokemon names (strings) corresponding to each pokemon the user adds to their team
    favoritePokemon: [] // A non-repeating set of pokemon names (strings) that the user has favorited for later viewing
  },
  reducers: {
    addFavoritePokemon(state, action) {
      if (!state.favoritePokemon.has(action.payload)) {
        state.favoritePokemon.add(action.payload) // add the string value of the pokemon's name to the set
      }
    },
    removeFavoritePokemon(state, action) {
      state.favoritePokemon.delete(action.payload)
    },
    addToTeam(state, action) {
      if (!state.favoritePokemon.has(action.payload)) {
        state.pokeTeam.add(action.payload) // add the string value of the pokemon's name to the set
      }
    },
    removeFromTeam(state, action) {
      state.pokeTeam.delete(action.payload)
    }
  }
})

export default pokeTeamSlice.reducer // this value is generated automatically by createSlice
export const {
  // actions for dispatching
  addFavoritePokemon,
  removeFavoritePokemon,
  addToTeam,
  removeFromTeam
} = pokeTeamSlice.actions
