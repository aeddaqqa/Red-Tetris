import "./App.css";
import Tetris from "./components/Tetris";
import styled, { ThemeProvider } from "styled-components";
import { Theme } from "./utils/theme";

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
  /* background-color: ${(props) => props.theme.background.secondary}; */
  grid-area: otherstage;
`;
const StyledStage = styled.div`
  grid-area: stage;
  border: 1px solid ${(props) => props.theme.border.stage};
`;
const StyledInfo = styled.div`
  grid-area: info;
  /* background-color: ${(props) => props.theme.background.secondary}; */
`;
const StyledMsgs = styled.div`
  grid-area: msgs;
  /* background-color: ${(props) => props.theme.background.secondary}; */
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
          <StyledInfo></StyledInfo>
          <StyledMsgs></StyledMsgs>
        </StyledContainer>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
