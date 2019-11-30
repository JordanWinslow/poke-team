import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import { persistStore } from "redux-persist"
import reduxImmutableStateInvariant from "redux-immutable-state-invariant"
import thunk from "redux-thunk"

import rootReducer from "./reducers/root-reducer"

const middlewares = [thunk, reduxImmutableStateInvariant()]

const configureStore = INITIAL_STATE => {
  const store = createStore(
    rootReducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
  const persistor = persistStore(store)
  return [store, persistor]
}

export default configureStore
