import React from "react"
import { useDispatch } from "react-redux"

import useDebounce from "../util/useDebounce"
import { searchPokemon } from "../redux/features/pokeAPI/pokeAPISlice"

import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles({
  searchContainer: {
    position: "fixed",
    zIndex: "4",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: "10px"
  }
})

const SearchBar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const updateText = useDebounce(text => {
    dispatch(searchPokemon(text.toLowerCase()))
  }, 1300) // dispatch API request with updated search text 1.3 seconds after they stop typing

  return (
    <Container className={classes.searchContainer} maxWidth="sm">
      <FormControl fullWidth>
        <InputLabel htmlFor="search-bar">Search Pokemon Here!</InputLabel>
        <Input
          id="search-bar"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={e => updateText(e.currentTarget.value)}
        />
      </FormControl>
    </Container>
  )
}

export default SearchBar
