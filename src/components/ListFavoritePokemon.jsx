import React from "react"
import { useSelector } from "react-redux"
const ListFavoritePokemon = ({ history }) => {
  const { favoritePokemon } = useSelector(state => state.pokeTeam)
  return (
    <div
      style={{
        backgroundColor: "white",
        zIndex: "3",
        width: "50%",
        margin: "auto",
        borderRadius: "3px",
        boxShadow: "0 3px 3px 3px rgba(0, 0, 0, 0.2)",
        padding: "3rem"
      }}
    >
      <button onClick={() => history.goBack()}>CLOSE</button>
      <h1>work in progress</h1>
      <h2>Your Favorited Pokemon:</h2>
      <div>
        {favoritePokemon.map(name => (
          <h3>{name}</h3>
        ))}
      </div>
    </div>
  )
}

export default ListFavoritePokemon
