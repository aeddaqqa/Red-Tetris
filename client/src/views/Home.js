import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledContainer, RightSide, StyledAvatar } from "./Home.Style";
import { getAvatar } from "../utils/Helpers";
import parse from "html-react-parser";

const Home = ({ socket }) => {
    let navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [load, setLoad] = useState(true);

    useEffect(() => {
        // console.log(avatar)
        getAvatar()
            .then((avatar) => {
                setAvatar(avatar);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);
    // const tt = () => avatar;
    return (
        <StyledContainer>
            <RightSide>
                <div className="title">
                    Red <span>Tetris</span>
                </div>
                <form
                    className="form"
                    onSubmit={(event) => {
                        // socket.emit("joinRoom", userName);
                        event.preventDefault();
                        navigate("/rooms", { state: { userName } });
                    }}
                >
                    <StyledAvatar>
                        {avatar ? parse(avatar) : <svg></svg>}
                        {/* <div

                            onClick={() => {
                                getAvatar()
                                    .then((avatar) => {
                                        setAvatar(avatar);
                                    })
                                    .catch((err) => {
                                        console.log(err.response.data);
                                    });
                            }}
                        >
                            generate new avatar
                        </div> */}
                    </StyledAvatar>
                    <TextField
                        className="input"
                        id="outlined-basic"
                        label="username"
                        variant="outlined"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input type="submit" />
                </form>
            </RightSide>
        </StyledContainer>
    );
};

export default Home;
