import React from "react"
import IconButton from "@material-ui/core/IconButton"
import FavoriteIcon from "@material-ui/icons/FavoriteSharp"
const FavoriteButton = ({ isFavorited, onClick }) => {
  return (
    <IconButton
      aria-label={
        isFavorited ? "Remove From Favorite Pokemon" : "Add to Favorite Pokemon"
      }
      onClick={onClick}
    >
      <FavoriteIcon color={isFavorited ? "primary" : "disabled"} />
    </IconButton>
  )
}

export default FavoriteButton
