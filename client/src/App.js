import "./App.css";
import Home from "./views/Home";
import styled, { ThemeProvider } from "styled-components";
import { Theme } from "./utils/theme";

const StyledApp = styled.div`
    width: 100vw;
    height: auto;
    height: 100vh;
    background-color: ${(props) => props.theme.background.primary};
`;

function App() {
    return (
        <ThemeProvider theme={Theme}>
            <StyledApp>
                <Home />
            </StyledApp>
        </ThemeProvider>
    );
}

export default App;
