import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"
import configureStore from "./redux/configure-store"
import { BrowserRouter as Router } from "react-router-dom"

import App from "./App"
import INITIAL_STATE from "./redux/initial-state"
import THEME from "./theme.json"
import "./index.css"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

const theme = createMuiTheme(THEME)

const [store, persistor] = configureStore(INITIAL_STATE)

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
