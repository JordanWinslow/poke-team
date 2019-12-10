import React from "react"
import { useDispatch } from "react-redux"

/*************BEGIN STYLING****************/
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import FavoriteIcon from "@material-ui/icons/Favorite"
import QueueIcon from "@material-ui/icons/Queue"
import SearchIcon from "@material-ui/icons/Search"
/*************END STYLING****************/

import { toggleFavoritePokemonMenu } from "../redux/features/pokeTeam/pokeTeamSlice"

const BottomNav = ({ history }) => {
  const dispatch = useDispatch()
  return (
    <BottomNavigation
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%"
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Search"
        icon={<SearchIcon />}
        onClick={() => {
          history.push("/search")
        }}
      />
      <BottomNavigationAction
        label="Favorites"
        icon={<FavoriteIcon />}
        onClick={() => {
          dispatch(toggleFavoritePokemonMenu())
          history.push("/favorites")
        }}
      />
      <BottomNavigationAction
        label="Your Team"
        icon={<QueueIcon />}
        onClick={() => history.push("/team")}
      />
    </BottomNavigation>
  )
}

export default BottomNav
