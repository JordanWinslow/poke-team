import React from "react"

const PokemonDetails = ({ match, history }) => {
  return (
    <div id="POKEMONDETAILS" align="center">
      <button onClick={() => history.goBack()}>BACK</button>
      <p align="center">
        This page will eventually contain information about{" "}
        {match.params.pokemonName}
      </p>
    </div>
  )
}

export default PokemonDetails
