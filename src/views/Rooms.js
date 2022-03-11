import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Select } from "antd";
import { useState } from "react";

const { Option } = Select;
const StyledContainer = styled.div`
  width: 100%;
  height: 95%;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 50%;
    text-align: center;
    font-size: 6em;
    padding: ${(props) => props.theme.headers.h1.padding};
    font-family: ${(props) => props.theme.headers.h1.font};
    font-weight: ${(props) => props.theme.headers.h1.fontWeight};
    letter-spacing: ${(props) => props.theme.headers.h1.letterSpacing};
    color: ${(props) => props.theme.headers.h1.color};
    padding-bottom: 3rem;
  }
  .create {
    &--select {
      width: 10%;
      /* height: 10%; */
      /* padding: 1rem 2rem; */
      border: none;
      /* .iUiqQB .create--select .ant-select-selector */
      .ant-select-selector {
        /* padding : 2rem; */
        height: 3rem;
        /* & > * { */
          /* height: 100%; */
        /* } */
        background-color: ${(props) => props.theme.background.secondary};
        color : white;
        border : 1px solid ${(props) => props.theme.border.avatar};
        .ant-select-selection-item {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
      .ant-select-arrow {
        color : ${(props) => props.theme.border.avatar};
      }
    } 
    width: 100%;
    /* background-color: blue; */
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    h2 {
      display: block
      font-size: ${(props) => props.theme.headers.h2.fontSize};
      padding: ${(props) => props.theme.headers.h2.padding};
      font-family: ${(props) => props.theme.headers.h2.font};
      font-weight: ${(props) => props.theme.headers.h2.fontWeight};
      letter-spacing: ${(props) => props.theme.headers.h2.letterSpacing};
      color: ${(props) => props.theme.headers.h2.color};
    }
    input[type="submit"] {
      /* height: 3rem; */
      padding: 0.8rem 2rem;
      border: none;
      cursor: pointer;
      border-radius: 2px;
      background-color: white;
      /* font-size: ${(props) => props.theme.message.fontSize}; */
      font-size: 0.8rem;
      font-family: ${(props) => props.theme.message.font};
      letter-spacing: ${(props) => props.theme.message.letterSpacing};
      color: ${(props) => props.theme.message.color};
      background: ${(props) => props.theme.message.background};
      /* border: none; */
      border : 1px solid ${(props) => props.theme.border.avatar};
      outline: none;
      &:focus {
        outline: none;
        border: none;
      }
    }
    &--input {
      .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root{
        color: white;
      }
      flex: 0 0 300px;
      label {
        color: white;
      }
      .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border-color: #b33030;
      }
    }
  }
`;
const Rooms = () => {
  const [mode, setMode] = useState("solo");
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <StyledContainer>
      <h1 className="title">Rooms</h1>
      <div className="create">
        <TextField
          className="create--input"
          id="standard-basic"
          label="room name"
          variant="outlined"
        />
        <Select
          className="create--select"
          defaultValue="mode"
          onChange={handleChange}
        >
          <Option value="solo">solo</Option>
          <Option value="multiplayer">multiplayer</Option>
        </Select>
        <input type="submit" value="create" />
      </div>
      <div className="join">
        <h2>join room</h2>
        <StyledContainer></StyledContainer>
      </div>
    </StyledContainer>
  );
};

export default Rooms;
