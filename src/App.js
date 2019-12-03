import React from "react"
import { Route, Switch } from "react-router-dom"
import Header from "./components/Header"
import PokemonGrid from "./components/PokemonGrid"
import PokemonDetails from "./components/PokemonDetails"
import BottomNav from "./components/BottomNavigation"

const App = () => {
  return (
    <div className="App">
      <Route path="/" component={Header} />
      <Route exact path="/" component={PokemonGrid} />
      <Route path="/pokemon/:pokemonName" component={PokemonDetails} />
      <Route path="/" component={BottomNav} />
    </div>
  )
}

export default App
