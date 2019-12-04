import React from "react"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle"

const TeamButton = ({ onTeam, onClick }) => {
  return (
    <CardActions>
      <Button
        variant="text"
        color="primary"
        startIcon={onTeam ? <RemoveCircleIcon /> : <AddCircleIcon />}
        aria-label={onTeam ? "Remove From Team" : "Add to Team"}
        onClick={onClick}
      >
        {onTeam // display the button text relating to if this pokemon is already on team or not
          ? "Remove From Team"
          : "Add to Team"}
      </Button>
    </CardActions>
  )
}

export default TeamButton
