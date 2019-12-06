import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "localforage"

import pokeAPI from "./features/pokeAPI/pokeAPISlice"
import pokeTeam from "./features/pokeTeam/pokeTeamSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["pokeAPI", "pokeTeam"] // TODO, figure out why persistor isn't saving all pokemon details
}

const rootReducer = combineReducers({
  pokeAPI,
  pokeTeam
})

export default persistReducer(persistConfig, rootReducer)
