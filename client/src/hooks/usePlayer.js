import { useCallback, useState } from "react";
import { checkCollision, STAGE_WIDTH } from "../utils/gameHelpers";
import {
    TETROMINOS,
    NEXT_TETROMINOS,
    randomTetromino,
} from "../utils/tetrominos";
import { ShiftTetros } from "../store/slices/playerSlice";
import { useDispatch } from "react-redux";

export const usePlayer = (
    tetrominos,
    setStart,
    setDropTime,
    setGameOver,
    setgetTetrimino
) => {
    const [concatTetriminos, setConcatTetriminos] = useState(false);
    const dispatch = useDispatch();
    // if (tetrominos.length > 0) {
    // console.log("in usePlayer", tetrominos)
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });
    const [nextPiece, setNextPiece] = useState({
        pos: { x: 0, y: 0 },
        tetromino: NEXT_TETROMINOS[0].shape,
        collided: false,
    });

    function rotate(matrix, dir) {
        // Make the rows to become cols (transpose)
        const mtrx = matrix.map((_, index) =>
            matrix.map((column) => column[index])
        );
        // Reverse each row to get a rotaded matrix
        if (dir > 0) return mtrx.map((row) => row.reverse());
        return mtrx.reverse();
    }

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        if (clonedPlayer.tetromino?.length === 4) {
            if (clonedPlayer.tetromino[0][0] === "I") {
                clonedPlayer.tetromino = [
                    [0, "I", 0, 0],
                    [0, "I", 0, 0],
                    [0, "I", 0, 0],
                    [0, "I", 0, 0],
                ];
            } else {
                clonedPlayer.tetromino = [
                    ["I", "I", "I", "I"],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                ];
            }
        } else clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0]?.length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }
        setPlayer(clonedPlayer);
    };

    const updatePlayerPos = ({ x, y, collided }) => {
        // //console.log("the x is", x);
        // //console.log("the y is", y);
        setPlayer((prev) => ({
            ...prev,
            pos: { x: prev.pos.x + x, y: prev.pos.y + y },
            collided,
        }));
    };

    const resetPlayer = useCallback(
        (stage) => {
            // console.log("reseting player", tetrominos, TETROMINOS[tetrominos[0]].shape, NEXT_TETROMINOS[tetrominos[1]].shape);
            let tetris = {
                pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
                tetromino: TETROMINOS[tetrominos[0]].shape,
                collided: false,
            };
            if (stage) {
                if (!checkCollision(tetris, stage, { x: 0, y: 0 })) {
                    setPlayer({
                        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
                        tetromino: tetris.tetromino,
                        collided: false,
                    });
                } else {
                    if (
                        stage[0][3][0] === 0 &&
                        stage[0][4][0] === 0 &&
                        stage[0][5][0] === 0 &&
                        stage[0][6][0] === 0
                    ) {
                        setPlayer({
                            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
                            tetromino: [
                                tetris.tetromino[0][0] === "I"
                                    ? tetris.tetromino[0]
                                    : tetris.tetromino[1],
                            ],
                            collided: false,
                        });
                    }
                    console.log("gaaaame oooooveeeeeeer");
                    setGameOver(true);
                    setStart(true);
                    setDropTime(null);
                    setgetTetrimino(false);
                }
            } else {
                setPlayer({
                    pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
                    tetromino: tetris.tetromino,
                    collided: false,
                });
            }

            setNextPiece({
                pos: { x: 0, y: 0 },
                tetromino: NEXT_TETROMINOS[tetrominos[1]].shape,
                collided: false,
            });
            // console.log("after setting the new ones",player, nextPiece)
            dispatch(ShiftTetros());
            // tetrominos.shift();
            if (tetrominos.length === 15) {
                setConcatTetriminos(true);
            }
            // if (tetriminos.length === 15) {
            //   setConcatTetriminos(true);
            // }
            // setNextPiece({
            //   pos: { x: 0, y: 0 },
            //   tetromino: TETROMINOS[1].shape,
            //   collided: false,
            // });
        },
        [tetrominos]
    );
    // }

    return [
        player,
        updatePlayerPos,
        resetPlayer,
        playerRotate,
        nextPiece,
        concatTetriminos,
        setConcatTetriminos,
    ];
};
