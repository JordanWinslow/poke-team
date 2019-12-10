import { createSlice } from "@reduxjs/toolkit"

const pokeTeamSlice = createSlice({
  name: "pokeTeam",
  initialState: {
    pokeTeam: [], // An array of pokemon names (strings) corresponding to each pokemon the user adds to their team
    favoritePokemon: [], // A non-repeating set of pokemon names (strings) that the user has favorited for later viewing
    favoritesMenuActive: false
  },
  reducers: {
    addFavoritePokemon(state, action) {
      state.favoritePokemon.push(action.payload)
    },
    removeFavoritePokemon(state, action) {
      state.favoritePokemon.splice(
        state.favoritePokemon.indexOf(action.payload),
        1
      )
    },
    toggleFavoritePokemonMenu(state) {
      state.favoritesMenuActive = !state.favoritesMenuActive
    },
    addToTeam(state, action) {
      if (state.pokeTeam.length !== 8) {
        // 8 pokemon max on a team
        state.pokeTeam.push(action.payload) // add the string value of the pokemon's name to the set
      }
    },
    removeFromTeam(state, action) {
      state.pokeTeam.splice(state.pokeTeam.indexOf(action.payload), 1)
    }
  }
})

export default pokeTeamSlice.reducer // this value is generated automatically by createSlice
export const {
  // actions for dispatching
  addFavoritePokemon,
  removeFavoritePokemon,
  addToTeam,
  removeFromTeam,
  toggleFavoritePokemonMenu
} = pokeTeamSlice.actions
