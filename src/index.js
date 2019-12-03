import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"
import configureStore from "./redux/configure-store" // CUSTOM configureStore WITH REDUX-PERSIST & REDUX TOOLKIT
import { BrowserRouter as Router } from "react-router-dom"

import App from "./App"
import THEME from "./theme.json"
import "./index.css"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

const theme = createMuiTheme(THEME)

const [store, persistor] = configureStore() // could have just imported but set it up this way in case we ever want to pass an initial state into the configureStore to override the defaults in each feature slice

render(
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById("root")
)
