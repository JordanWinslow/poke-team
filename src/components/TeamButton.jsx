import React from "react"
import Button from "@material-ui/core/Button"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle"

const TeamButton = ({ onTeam, onClick, maxSizeReached }) => {
  console.log(maxSizeReached)

  return (
    <Button
      disabled={onTeam ? false : maxSizeReached}
      variant="text"
      color={onTeam ? "primary" : "secondary"}
      startIcon={onTeam ? <RemoveCircleIcon /> : <AddCircleIcon />}
      aria-label={
        maxSizeReached
          ? "Max Team Size"
          : onTeam
          ? "Remove From Team"
          : "Add to Team"
      }
      onClick={onClick}
    >
      {maxSizeReached && !onTeam
        ? "Max Team Size"
        : onTeam
        ? "Remove From Team"
        : "Add to Team"}
    </Button>
  )
}

export default TeamButton
