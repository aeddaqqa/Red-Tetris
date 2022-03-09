import styled from "styled-components";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../utils/gameHelpers";

export const StyledStage = styled.div`
  background: black;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 1px;
  grid-template-rows: repeat(STAGE_HEIGHT, 1fr);
`;

export const RowStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 1px;
  /* border: solid 1px #b33030; */
`;

export const Col = styled.div`
  /* width: 40px; */
  flex: 1;
  height: 100%;
  border: solid 1px #b33030;
  background-color: ${(props) => props.back};
`;
