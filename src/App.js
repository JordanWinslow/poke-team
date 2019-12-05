import React from "react"
import { Route, Switch } from "react-router-dom"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import PokemonGrid from "./components/PokemonGrid"
import PokemonDetails from "./components/PokemonDetails"
import ListFavoritePokemon from "./components/ListFavoritePokemon"
import BottomNav from "./components/BottomNavigation"

const App = () => {
  return (
    <div className="App">
      <Route path="/" component={Header} />
      <Route path="/search" component={SearchBar} />
      <Route path="/" component={PokemonGrid} />
      <Route path="/pokemon/:pokemonName" component={PokemonDetails} />
      <Route path="/favorites" component={ListFavoritePokemon} />
      <Route path="/" component={BottomNav} />
    </div>
  )
}

export default App
