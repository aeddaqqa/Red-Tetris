import "./App.css";

import styled, { ThemeProvider } from "styled-components";
import { Theme } from "./utils/theme";
import NavBar from "./components/NavBar/NavBar";
import Game from "./views/Game";
import Home from "./views/Home";
import Rooms from "./views/Rooms";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

const StyledApp = styled.div`
  width: 100vw;
  height: auto;
  /* height: auto; */
  height: 100vh;
  min-height: 100vh;
  /* padding: 2rem; */
  background-color: ${(props) => props.theme.background.primary};
`;
const StyledContainer = styled.div`
  width: 100%;
`;

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
        <StyledApp className="App">
          {/* <NavBar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/rooms" element={<Rooms />} />
          </Routes>
        </StyledApp>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
