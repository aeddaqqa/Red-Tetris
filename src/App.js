import "./App.css";
import Tetris from "./components/Tetris/Tetris";
import styled, { ThemeProvider } from "styled-components";
import { Theme } from "./utils/theme";
import Info from "./components/Info/Info";
import Chat from "./components/Chat/Chat.js";

const StyledApp = styled.div`
  width: 100vw;
  background-color: ${(props) => props.theme.background.primary};
  height: 100vh;
`;
const StyledNav = styled.div`
  width: 100%;
  height: 5%;
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 95%;
  padding: 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1rem;
  grid-template-areas:
    "otherstage stage info"
    "otherstage stage msgs"
    "otherstage stage msgs";
`;

const StyledOtherStages = styled.div`
  grid-area: otherstage;
  background-color: blue;
`;
const StyledStage = styled.div`
  grid-area: stage;
  border: 1px solid ${(props) => props.theme.border.stage};
`;
const StyledInfo = styled.div`
  grid-area: info;
  /* padding: 1rem; */
`;
const StyledMsgs = styled.div`
  background-color: blue;
  grid-area: msgs;
`;

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <StyledApp className="App">
        <StyledNav />
        <StyledContainer>
          <StyledOtherStages></StyledOtherStages>
          <StyledStage>
            <Tetris />
          </StyledStage>
          <StyledInfo>
            <Info />
          </StyledInfo>
          <StyledMsgs>
            <Chat />
          </StyledMsgs>
        </StyledContainer>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
