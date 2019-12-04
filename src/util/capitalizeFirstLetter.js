const capitalizeFirstLetter = string =>
  string === undefined
    ? null
    : string[0]
    ? `${string[0].toUpperCase()}${string.substring(1)}`
    : ""
export default capitalizeFirstLetter
