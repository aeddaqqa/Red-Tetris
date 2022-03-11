import "./App.css";

import styled, { ThemeProvider } from "styled-components";
import { Theme } from "./utils/theme";
import NavBar from "./components/NavBar/NavBar";
import Game from "./views/Game";
import Home from "./views/Home";
import Rooms from "./views/Rooms";
const StyledApp = styled.div`
  width: 100vw;
  background-color: ${(props) => props.theme.background.primary};
  height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <StyledApp className="App">
        {/* <NavBar /> */}
        {/* <Game /> */}
        {/* <Home /> */}
        <Rooms />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
