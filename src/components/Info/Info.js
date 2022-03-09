import styled from "styled-components";

const StyledInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.2rem;
  background-color: ${(props) => props.theme.background.secondary};
  display: flex;
`;

const NextTetromino = styled.div`
  flex: 3;
  background-color: blue;
  .header {
    width: 100%;
    /* height: 20%; */
    background-color: ${(props) => props.theme.background.primary};
    padding: 1rem;
    text-align: center;
    color: white;
    font-size: 1.5rem;
  }
`;

const GameDetails = styled.div`
  background-color: red;
  flex: 2;
  display: flex;
  flex-direction: column;
  h1 {
    width: 100%;
    font-size: 1.5rem;
    background-color: ${(props) => props.theme.background.primary};
    font-weight: bold;
    color: white;
    text-align: center;
    padding: 1rem;
    letterspacing: 2px;
  }
  .content {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  p {
    /* flex: 0 0 100%; */
    font-size: 1.2rem;
    color: white;
    text-align: center;
    padding: 1rem;
    letterspacing: 2px;
  }
`;

const Info = () => {
  return (
    <StyledInfo>
      <GameDetails>
        <h1>Game Details</h1>
        <div className="content">
          <p>score : 50</p>
          <p>level : 10</p>
          <p>mode select</p>
        </div>
      </GameDetails>
      <NextTetromino>
        <div className="header">Next Tetromino</div>
        <div className="content"></div>
      </NextTetromino>
    </StyledInfo>
  );
};

export default Info;
