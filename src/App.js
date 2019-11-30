import React from "react"
import Header from "./components/Header"
import PokemonGrid from "./components/PokemonGrid"
import BottomNav from "./components/BottomNavigation"

const App = () => {
  return (
    <div className="App">
      <Header />
      <PokemonGrid />
      <BottomNav />
    </div>
  )
}

export default App
