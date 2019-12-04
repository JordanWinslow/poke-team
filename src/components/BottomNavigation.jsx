import React from "react"
import { useDispatch } from "react-redux"

/*************BEGIN STYLING****************/
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import FavoriteIcon from "@material-ui/icons/Favorite"
import QueueIcon from "@material-ui/icons/Queue"
import InfoIcon from "@material-ui/icons/Info"
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
      /*value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}*/
      showLabels
    >
      <BottomNavigationAction
        label="Favorites"
        icon={<FavoriteIcon />}
        onClick={() => {
          dispatch(toggleFavoritePokemonMenu())
          history.push("/favorites")
        }}
      />
      <BottomNavigationAction label="Your Team" icon={<QueueIcon />} />
      <BottomNavigationAction label="About" icon={<InfoIcon />} />
    </BottomNavigation>
  )
}

export default BottomNav
