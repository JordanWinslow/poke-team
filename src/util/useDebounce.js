import { useCallback } from "react"
import debounce from "lodash/debounce"
// CREATE A CUSTOM HOOK TO DEBOUNCE OUR INPUT SO API REQUEST ISN'T SENT ON EVERY KEYSTROKE
const useDebounce = (func, delay) => {
  return useCallback(debounce(func, delay), [])
}
export default useDebounce
