import React from "react"
import { Route, Switch } from "react-router-dom"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import YourTeam from "./components/YourTeam"
import PokemonGrid from "./components/PokemonGrid"
import PokemonDetails from "./components/PokemonDetails"
import ListFavoritePokemon from "./components/ListFavoritePokemon"
import BottomNav from "./components/BottomNavigation"

const App = () => {
  return (
    <div className="App">
      <Route path="/" component={Header} />
      {/*<Route
        path="/search"
        component={SearchBar} OVERLAYS CONTENT ABOVE EVERYTHING ELSE
      />*/}
      <Route
        path="/favorites"
        component={
          ListFavoritePokemon /*OVERLAYS CONTENT ABOVE EVERYTHING ELSE*/
        }
      />
      <Switch>
        <Route path="/team" component={YourTeam} />
        <Route path="/pokemon/:pokemonName" component={PokemonDetails} />
        <Route path="/" component={PokemonGrid} />
      </Switch>
      <Route path="/" component={BottomNav} />
    </div>
  )
}

export default App
