import React from "react"

const PokemonDetails = ({ match, history }) => {
  return (
    <div id="POKEMONDETAILS">
      <button onClick={() => history.goBack()}>BACK</button>
      <p>{match.params.pokemonName}</p>
    </div>
  )
}

export default PokemonDetails
