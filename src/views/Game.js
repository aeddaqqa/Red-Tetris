import styled from "styled-components";
// import Info from "../components/Info/Info";
import Info from "../components/Info/Info";
import Chat from "../components/Chat/Chat.js";
import OtherStages from "../components/OtherStages/OtherStages";
import Tetris from "../components/Tetris/Tetris";

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
  grid-area: msgs;
`;

const Game = () => {
  return (
    <StyledContainer>
      <StyledOtherStages>
        <OtherStages />
      </StyledOtherStages>
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
  );
};

export default Game;
