import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import styled, { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import Rooms from "./views/Rooms";
import { Theme } from "./utils/theme";
import NavBar from "./components/NavBar/NavBar";
import Game from "./views/Game";
import Home from "./views/Home";
import { startConnecting, isConnected } from "./store/slices/connectionSlice";

// const socket = io.connect("http://localhost:3001");

const StyledApp = styled.div`
    width: 100vw;
    height: auto;
    /* height: auto; */
    height: 100vh;
    min-height: 100vh;
    /* padding: 2rem; */
    background-color: ${(props) => props.theme.background.primary};
`;

function App() {
    const [avatar, setAvatar] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startConnecting());
        // dispatch(isConnected());
    }, []);

    return (
        // <BrowserRouter>
        <div className="App">
            <ThemeProvider theme={Theme}>
                <StyledApp className="App">
                    <Home avatar={avatar} setAvatar={setAvatar} />
                </StyledApp>
            </ThemeProvider>
        </div>
    );
}

export default App;
