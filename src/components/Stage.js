import { createStage } from "../gameHelpers";
import styled from "styled-components";

const l = { position: { x: 0, y: 0 }, shape: [(1, 1, 1, 1)] };

const Container = styled.div`
  width: calc(10 * 40px);
  height: calc(20 * 40px);
  border: solid 1px #b33030;
  background-color: #072227;
  display: flex;
  flex-flow: column;
`;

const RowStyle = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
  border: solid 1px #b33030;
`;

const Col = styled.div`
  width: 40px;
  height: 100%;
  border: solid 1px #b33030;
  background-color: ${(props) => props.back};
`;

const Row = ({ row, rowIdx, stage }) => {
  console.log(stage[rowIdx][0]);
  return (
    <RowStyle>
      {row.map((col, colIdx) => (
        <Col key={colIdx} back={col ? "#aefeff" : "#072227"} />
      ))}
    </RowStyle>
  );
};

const Stage = () => {
  const stage = createStage();
  stage[0][0] = true;
  stage[0][1] = true;
  stage[0][2] = true;
  stage[0][3] = true;
  //   if (stage[0][0] === true) console.log(stage);
  return (
    <Container>
      {stage.map((row, rowIdx) => (
        <Row key={rowIdx} stage={stage} row={row} rowIdx={rowIdx} />
      ))}
    </Container>
  );
};

export default Stage;
