import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from "localforage"

import pokeAPI from "./poke-api-reducer"
import pokeTeam from "./poke-team-reducer"

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
