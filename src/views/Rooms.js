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
    display: flex;
    width: 100%;
    flex-direction: column;
    .container {
      flex: 1;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 50px;
    }
    &--select {
      width: 50%;
      width: 10%;
      border: none;
      .ant-select-selector {
        height: 3rem;
        background-color: ${(props) => props.theme.background.secondary};
        color: white;
        border: 1px solid ${(props) => props.theme.border.avatar};
        .ant-select-selection-item {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
      .ant-select-arrow {
        color: ${(props) => props.theme.border.avatar};
      }
    }
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    .title {
      font-size: 4em;
      padding-bottom: 0.5rem;
    }
    input[type="submit"] {
      padding: 0.8rem 2rem;
      border: none;
      cursor: pointer;
      border-radius: 2px;
      background-color: white;
      font-size: 0.8rem;
      font-family: ${(props) => props.theme.message.font};
      letter-spacing: ${(props) => props.theme.message.letterSpacing};
      color: ${(props) => props.theme.message.color};
      background: ${(props) => props.theme.message.background};
      border: 1px solid ${(props) => props.theme.border.avatar};
      outline: none;
      &:focus {
        outline: none;
        border: none;
      }
    }
    &--input {
      .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
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

const JoinRoom = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: auto;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 4em;
    padding-bottom: 0.5rem;
  }
  .container {
    width: 100%;
    flex: 1;
    background-color: ${(props) => props.theme.background.secondary};
    header,
    .room {
      width: 100%;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      align-content: center;
      border-bottom: 1px solid white;
      .item {
        font-size: 1rem;
        padding: 0.5rem;
        color: white;
        text-align: center;
        flex: 1;
      }
      .name {
        flex: 3;
      }
    }
    .room {
      border-bottom: 1px solid #b33030;
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
      {/* <h1 className="title">Rooms</h1> */}
      <div className="create">
        <h2 className="title">create room</h2>
        <div className="container">
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
      </div>
      <JoinRoom>
        <h2 className="title">join room</h2>
        <div className="container">
          <header>
            <div className="item name">name</div>
            <div className="item mode">mode</div>
            <div className="item players">players</div>
            <div className="item status">status</div>
          </header>
          <div className="room">
            <div className="item name">name</div>
            <div className="item mode">mode</div>
            <div className="item players">players</div>
            <div className="item status">status</div>
          </div>
          <div className="room">
            <div className="item name">name</div>
            <div className="item mode">mode</div>
            <div className="item players">players</div>
            <div className="item status">status</div>
          </div>
          <div className="room">
            <div className="item name">name</div>
            <div className="item mode">mode</div>
            <div className="item players">players</div>
            <div className="item status">status</div>
          </div>
          <div className="room">
            <div className="item name">name</div>
            <div className="item mode">mode</div>
            <div className="item players">players</div>
            <div className="item status">status</div>
          </div>
        </div>
      </JoinRoom>
    </StyledContainer>
  );
};

export default Rooms;
