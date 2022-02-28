import { useState } from "react";
import styled from "styled-components";
import Cell from "./Cell";
import Display from "./Display";
import Stage from "./Stage";
import StartButton from "./StartButton";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { createStage, checkCollision } from "../utils/gameHelpers";

const Styled = styled.button`
  width: 100%;
  height: 100%;
  /* background-color: red; */
  background: transparent;
  display: flex;
  outline: none;
  border: none;
  align-items: center;
  justify-content: center;
  &:focus {
    outline: none;
    border: none;
  }
`;

export const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: #fff;
  background: #333;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;

const StartButoon = ({ callback }) => (
  <StyledStartButton onClick={callback}>Start game</StyledStartButton>
);

const Tetris = () => {
  const [gameOver, setGameOver] = useState(false);
  const [dropTime, setDropTime] = useState(null);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);
  const movePlayer = (dir) => {
    // console.log("before", player)
    if (!checkCollision(player, stage, { x: dir, y: 0 }))
      updatePlayerPos({ x: dir, y: 0 });
    // console.log("after", player)
  };
  const startGame = () => {
    //reset everything
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
    console.log("bskch");
  };
  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 }))
      updatePlayerPos({ x: 0, y: 1, collided: false });
    else {
      //game over !!!
      if (player.pos.y < 1) {
        console.log("GameOver!!!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };
  const dropPlayer = () => {
    drop();
  };
  const move = ({ keyCode }) => {
    console.log("in here", keyCode);
    if (!gameOver) {
      if (keyCode === 37)
        //left key
        movePlayer(-1);
      else if (keyCode === 39)
        //right key
        movePlayer(1);
      else if (keyCode === 40)
        //down key
        dropPlayer(1);
      else if (keyCode === 38)
        //up key
        playerRotate(stage, 1);
    }
  };

  return (
    <Styled onKeyDown={(e) => move(e)}>
      <Stage stage={stage} />
      <StartButoon callback={startGame} />
    </Styled>
  );
};

export default Tetris;
