import { StyledStage, RowStyle, Col } from "./Stage.Style";

const Row = ({ row, rowIdx, stage }) => {
  return (
    <RowStyle>
      {row.map((col, colIdx) => {
        return <Col key={colIdx} back={col[0] ? "#aefeff" : "#072227"} />;
      })}
    </RowStyle>
  );
};

const Stage = ({ stage }) => {
  return (
    <StyledStage>
      {stage.map((row, rowIdx) => (
        <Row key={rowIdx} stage={stage} row={row} rowIdx={rowIdx} />
      ))}
    </StyledStage>
  );
};

export default Stage;
