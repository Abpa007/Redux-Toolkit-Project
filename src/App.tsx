import {Provider} from "react-redux"
import store from "./Store/Store"
import './App.css'
import { Container, Typography } from "@mui/material"

function App() {

  return (
    <>

      <Provider store={store}>
        <Container maxWidth="md">
          <Typography component="h1" variant="h2" align="center">
            Habit Tracker
          </Typography>
        </Container>
      </Provider>
    </>
  )
}

export default App
