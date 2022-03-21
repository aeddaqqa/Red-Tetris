import TextField from "@mui/material/TextField";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { StyledContainer, JoinRoom, StyledRoomCard } from "./Rooms.Style";
import { useLocation } from "react-router";
// import { BoxesLoader } from "react-awesome-loaders";
import { AiOutlineUser } from "react-icons/ai";
// import io from "socket.io-client";
import { Badge } from "antd";

const RoomCard = () => {
    return (
        <Badge.Ribbon text="Battle" color="red">
            <StyledRoomCard>
                <div className="name">
                    pikala room <AiOutlineUser style={{ margin: "0 10px" }} /> 1
                    / 4
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
                <div className="status">In Game...</div>
            </StyledRoomCard>
        </Badge.Ribbon>
    );
};
const { Option } = Select;

const Rooms = ({ socket }) => {
    const [mode, setMode] = useState("solo");
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState("");
    const { state } = useLocation();
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    useEffect(() => {
        console.log("bigola");
        // socket.on("updateRooms", (rooms) => {
        //     console.log("farwila", rooms);
        //     // console.log(rooms);
        //     // setRooms([...rooms]);
        //     // console.log(rooms);
        // });
        // socket.emit("getRooms");
    }, [socket]);
    // useEffect(() => {}, [rooms]);
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
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                    <Select
                        className="create--select"
                        defaultValue="mode"
                        onChange={handleChange}
                    >
                        <Option value="solo">solo</Option>
                        <Option value="multiplayer">multiplayer</Option>
                    </Select>
                    <input
                        type="submit"
                        value="create"
                        onClick={(e) => {
                            e.preventDefault();
                            // console.log(roomName);
                            // socket.emit("addRoom", {
                            //   name: roomName,
                            // });
                            // console.log(roomName);
                        }}
                    />
                </div>
            </div>
            <RoomCard />
            {/* <JoinRoom>
                <h2 className="title">join room</h2>
                <div className="container">
                    <header>
                        <div className="item name">name</div>
                        <div className="item mode">mode</div>
                        <div className="item players">players</div>
                        <div className="item status">status</div>
                    </header>
                    {rooms.map((room, index) => (
                        <div key={index} className="room">
                            <div className="item name">{room.name}</div>
                            <div className="item mode">mode</div>
                            <div className="item players">players</div>
                            <div className="item status">status</div>
                        </div>
                    ))}
                    {/* <div className="room">
            <div className="item name">name</div>
            <div className="item mode">mode</div>
            <div className="item players">players</div>
            <div className="item status">status</div>
          </div> */}
            {/* </div> */}
            {/* </JoinRoom> */}
        </StyledContainer>
    );
};

export default Rooms;
