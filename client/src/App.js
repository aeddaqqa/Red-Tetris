import "./App.css";
import Home from "./views/Home/Home";
import styled, { ThemeProvider } from "styled-components";
import { Theme } from "./utils/theme";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/NavBar/NavBar";
import Rooms from "./views/Rooms/Rooms";

const StyledApp = styled.div`
    width: 100vw;
    height: auto;
    height: 100vh;
    background-color: ${(props) => props.theme.background.primary};
`;

const Router = ({ player }) => {};

function App() {
    const { player } = useSelector((state) => state);
    useEffect(() => {
        console.log(player);
    }, [player]);
    return (
        <ThemeProvider theme={Theme}>
            <StyledApp>
                {!player.userName ? (
                    <Home />
                ) : (
                    <>
                        <Navbar user={player} />
                        <Rooms />
                    </>
                )}
            </StyledApp>
        </ThemeProvider>
    );
}

export default App;
