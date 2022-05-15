import { useEffect, useState } from "react";
import styled from "styled-components";
// import Info from "../components/Info/Info";
import Info from "../../components/Info/Info";
import Chat from "../../components/Chat/Chat.js";
import OtherStages from "../../components/OtherStages/OtherStages";
import Tetris from "../../components/Tetris/Tetris";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "../../hooks/useInterval";
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
import { useGameStatus } from "../../hooks/useGameStatus";
import { createStage, checkCollision } from "../../utils/gameHelpers";
import {
    startTheGameRequest,
    newTetrosRequest,
} from "../../store/slices/playerSlice";
import { sendStage } from "../../store/slices/playerSlice";
import { getTetrominos } from "../../utils/tetrominos";
import GameOver from "../../components/GameOver";
import { ToastContainer, toast } from "react-toastify";

const StyledContainer = styled.div`
    background-color: red;
    display: grid;
    grid-template-columns: 500px 500px 500px;
    grid-template-rows: 250px 400px 400px;
    gap: 1rem;
    justify-content: center;
    grid-template-areas:
        "otherstage stage info"
        "otherstage stage msgs"
        "otherstage stage msgs";
    @media (max-width: 1500px) {
        background-color: blue;
        grid-template-columns: 450px 450px 450px !important;
        grid-template-rows: 250px 325px 325px !important;
    }
    @media (max-width: 1300px) {
        background-color: green;
        gap: 5px;
        grid-template-columns: 350px 350px 350px !important;
        grid-template-rows: 250px 250px 250px !important;
    }
    @media (max-width: 1000px) {
        grid-template-columns: 300px 300px !important;
        grid-template-rows: 400px 600px !important;
        grid-template-areas:
            "msgs  info"
            "otherstage  stage" !important;
    }
    @media (max-width: 600px) {
        grid-template-columns: 300px !important;
        grid-template-rows: 500px 500px 250px 250px !important;
        background-color: turquoise !important;
        grid-template-areas:
            "info"
            "stage"
            "otherstage"
            "msgs" !important;
    }
    @media (max-width: 380px) {
        grid-template-columns: 250px !important;
        grid-template-rows: 500px 500px 250px 250px !important;
        background-color: turquoise !important;
        grid-template-areas:
            "info"
            "stage"
            "otherstage"
            "msgs" !important;
    }
`;

const StyledOtherStages = styled.div`
    grid-area: otherstage;
    background: blue;
`;
const StyledStage = styled.div`
    background: yellow;
    grid-area: stage;
    border: 1px solid ${(props) => props.theme.border.stage};
`;
const StyledInfo = styled.div`
    background: red;
    grid-area: info;
    /* padding: 1rem; */
`;
const StyledMsgs = styled.div`
    background: green;
    grid-area: msgs;
`;

const Game = () => {
    const dispatch = useDispatch();
    let tetrominos = useSelector((state) => state.player.tetros);
    const [start, setStart] = useState(false);
    const players = useSelector((state) => state.players.players);
    const UserPlayer = useSelector((state) => state.player);
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [getTetrimino, setgetTetrimino] = useState(false);
    const [gameStart, setGameStart] = useState(false);
    const [firstDrop, setfirstDrop] = useState(1);

    const [
        player,
        updatePlayerPos,
        resetPlayer,
        playerRotate,
        nextPiece,
        concatTetriminos,
        setConcatTetriminos,
    ] = usePlayer(
        tetrominos,
        setStart,
        setDropTime,
        setGameOver,
        setgetTetrimino
    );
    const [stage, setStage, rowsCleared, nextStage, setNextStage] = useStage(
        player,
        resetPlayer,
        nextPiece,
        gameOver
    );
    const [score, setScore, rows, setRows, level, setLevel] =
        useGameStatus(rowsCleared);

    //Emit the stage
    useEffect(() => {
        dispatch(sendStage(stage));
    }, [stage]);

    const movePlayer = (dir) => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    };

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1));
            }
        }
    };

    // Get Tetriminos for the second time
    useEffect(() => {
        if (concatTetriminos) {
            dispatch(newTetrosRequest(UserPlayer.roomName));
            setConcatTetriminos(false);
        }
    }, [concatTetriminos]);

    //Emit the stage

    //start the game
    useEffect(() => {
        if (gameStart) {
            dispatch(sendStage(stage));
            if (gameOver || (UserPlayer.gameEnd && tetrominos.length > 0)) {
                setStart(true);
                setStage(createStage());
                setNextStage(createStage(4, 4));
                resetPlayer();
                setGameOver(false);
                setScore(0);
                setLevel(0);
                setRows(0);
                setDropTime(1000);
            }
            if (firstDrop === 1) {
                resetPlayer(stage);
                setfirstDrop(2);
                setScore(0);
                setLevel(0);
                setRows(0);
            }
            setGameOver(false);
            setGameStart(false);
            setDropTime(1000 / (level + 1) + 200);
        }
    }, [gameStart]);

    useEffect(() => {
        if (tetrominos.length > 0 && !UserPlayer.gameOver) {
            setGameStart(true);
            setStart(true);
            setgetTetrimino(true);
        }
        return () => {};
    }, [tetrominos]);

    const startgame = (e) => {
        if (e.key === "Enter") {
            if (!getTetrimino) {
                if (UserPlayer.admin) {
                    dispatch(startTheGameRequest(UserPlayer.roomName));
                } else toast("Wait for admin to start the Game");
            }
        }
    };

    const drop = () => {
        // Increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(level + 1);
            // Also increase speed
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            // // Game over!
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    };

    // Hard Drop the tetrimino
    const hardDrop = () => {
        // audio.play();
        let tmp = 0;
        while (!checkCollision(player, stage, { x: 0, y: tmp })) tmp += 1;
        updatePlayerPos({ x: 0, y: tmp - 1, collided: false });
    };

    const dropPlayer = () => {
        // We don't need to run the interval when we use the arrow down to
        // move the tetromino downwards. So deactivate it for now.
        setDropTime(null);
        drop();
    };

    // console.log(nextPiece, nextStage);

    // This one starts the game
    // Custom hook by Dan Abramov
    useInterval(() => {
        drop();
    }, dropTime);

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            } else if (keyCode === 32) {
                hardDrop();
            }
        }
    };

    return (
        <StyledContainer onKeyPress={startgame}>
            <ToastContainer />
            <StyledOtherStages>
                <OtherStages stages={UserPlayer.stages} />
            </StyledOtherStages>
            <StyledStage>
                <Tetris
                    UserPlayer={UserPlayer}
                    move={move}
                    keyUp={keyUp}
                    stage={stage}
                    gameOver={gameOver}
                    start={start}
                    setStart={setStart}
                />
            </StyledStage>
            <StyledInfo>
                <Info
                    score={score}
                    level={level}
                    rows={rows}
                    nextStage={nextStage}
                />
            </StyledInfo>
            <StyledMsgs>
                <Chat players={players} player={UserPlayer} />
            </StyledMsgs>
        </StyledContainer>
    );
};

export default Game;
