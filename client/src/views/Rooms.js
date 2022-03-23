import TextField from "@mui/material/TextField";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { StyledContainer, JoinRoom, StyledRoomCard } from "./Rooms.Style";
import { useSelector, useDispatch } from "react-redux";
import { updateRooms } from "../reducers/roomsSlice";
import { addRoomName } from "../reducers/playerSlice";
import { getRoomsRequest } from "../actions/roomsActions";
import { ToastContainer, toast } from "react-toastify";
import StartButton from "../components/StartButton/StartButton";
import { AiOutlineUser } from "react-icons/ai";
// import { BoxesLoader } from "react-awesome-loaders";

import { Badge } from "antd";

const RoomCard = ({ room }) => {
    return (
        <Badge.Ribbon text={room.mode} color="red">
            <StyledRoomCard>
                <div className="name">
                    {room.name} <AiOutlineUser /> {room.playersIn}/
                    {room.maxPlayers}
                </div>
                {/* <div className="players">
                    <AiOutlineUser style={{ marginRight: "30px" }} /> 1 / 4
                </div> */}
                <div className="cover"></div>
                {/* <BoxesLoader
                boxColor={"#6366F1"}
                style={{ marginBottom: "20px" }}
                desktopSize={"128px"}
                mobileSize={"80px"}
            /> */}
                <div className="status">status</div>
            </StyledRoomCard>
        </Badge.Ribbon>
    );
};

const { Option } = Select;

const Rooms = () => {
    const [mode, setMode] = useState("solo");
    const [room, setRoom] = useState("");
    // const rooms = useSelector((state) => state.roomsReducer.rooms);
    // const { state } = useLocation();
    function handleChange(value) {
        console.log(`selected ${value}`);
        setMode(value);
    }

    const createRoom = () => {};

    useEffect(() => {}, []);
    // useEffect(() => {
    //   console.log(state);
    // }, [state]);
    return (
        <StyledContainer>
            <ToastContainer />
            {/* <h1 className="title">Rooms</h1> */}
            <div className="create">
                <h2 className="title">create room</h2>
                <div className="container">
                    <TextField
                        className="create--input"
                        id="standard-basic"
                        label="room name"
                        variant="outlined"
                        onChange={(e) => {
                            setRoom(e.target.value);
                        }}
                    />
                    <Select
                        className="create--select"
                        defaultValue="mode"
                        onChange={handleChange}
                    >
                        <Option value="solo">solo</Option>
                        <Option value="battle">battle</Option>
                    </Select>
                    {/* <div> */}
                    <StartButton createRoom={createRoom} />
                    {/* <input type="submit" value="create" onClick={createRoom} /> */}
                </div>
            </div>
            <JoinRoom>
                <h2 className="title">join room</h2>
                <div className="rooms-container">
                    <RoomCard room={room} />
                </div>
            </JoinRoom>
        </StyledContainer>
    );
};

export default Rooms;
