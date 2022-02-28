import { createStage } from "../utils/gameHelpers";
import styled from "styled-components";
import { TETROMINOS } from "../utils/tetrominos";

// const l = { position: { x: 0, y: 0 }, shape: [(1, 1, 1, 1)] };

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
  // console.log(stage[rowIdx][0]);
  // console.log(stage);
  // stage[rowIdx][0] ;
  return (
    <RowStyle>
      {row.map((col, colIdx) => {
        return <Col key={colIdx} back={col[0] ? "#aefeff" : "#072227"} />;
      })}
    </RowStyle>
  );
};

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(20vw / ${(props) => props.width})
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 20vw;
  background: #111;
  overflow: hidden;
`;

export const StyledCell = styled.div`
  width: auto;
  background: rgba(${(props) => props.color}, 0.8);
  border: ${(props) => (props.type === 0 ? "1px solid #FFF" : "4px solid red")};
  border-bottom-color: rgba(
    ${(props) => (props.type === 0 ? "white" : props.color)},
    0.1
  );
  border-right-color: rgba(
    ${(props) => (props.type === 0 ? "white" : props.color)},
    1
  );
  border-top-color: rgba(
    ${(props) => (props.type === 0 ? "white" : props.color)},
    1
  );
  border-left-color: rgba(
    ${(props) => (props.type === 0 ? "white" : props.color)},
    0.3
  );
`;

const Cell = (props) => {
  const { type } = props;

  return <StyledCell type={type} color={TETROMINOS[type].color} />;
};

// const Stage = ({ stage }) => {
//   // const stage = createStage();
//   // console.log(stage);
//   return (
//     <StyledStage width={stage[0].length} height={stage.length}>
//       {stage.map((row) =>
//         row.map((cell, x) => <Cell key={x} type={cell[0]} />)
//       )}
//     </StyledStage>
//   );
// };
const Stage = ({ stage }) => {
  // const stage = createStage();
  // console.log(stage);
  return (
    <Container>
      {stage.map((row, rowIdx) => (
        <Row key={rowIdx} stage={stage} row={row} rowIdx={rowIdx} />
      ))}
    </Container>
  );
};

export default Stage;
