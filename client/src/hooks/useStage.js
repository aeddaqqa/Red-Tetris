import { useState, useEffect } from "react";
import {
    createStage,
    STAGE_HEIGHT,
    checkCollision,
} from "../utils/gameHelpers";
import { addWallRequest } from "../store/slices/playerSlice";
import { useDispatch } from "react-redux";

export const useStage = (player, resetPlayer, nextPiece, gameOver) => {
    const [stage, setStage] = useState(createStage());
    const [nextStage, setNextStage] = useState(createStage(4, 4));
    const [rowsCleared, setRowsCleared] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setRowsCleared(0);
        const sweepRows = (newStage) =>
            newStage.reduce((ack, row) => {
                if (row.findIndex((cell) => cell[0] === 0) === -1) {
                    // console.log("hhhhhhhhh", rowsCleared);
                    setRowsCleared(rowsCleared + 1);
                    ack.unshift(
                        new Array(newStage[0].length).fill([0, "clear"])
                    );
                    return ack;
                }
                ack.push(row);
                return ack;
            }, []);

        const updateStage = (prevStage) => {
            // First flush the stage
            const newStage = prevStage.map((row) =>
                row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
            );

            // Then draw the shadow of tetromino
            let shadow = 1;
            while (
                shadow < STAGE_HEIGHT &&
                !checkCollision(player, stage, { x: 0, y: shadow })
            ) {
                shadow++;
            }
            if (shadow) {
                player.tetromino.forEach((row, y) => {
                    row.forEach((value, x) => {
                        if (value !== 0) {
                            newStage[y + player.pos.y + shadow - 1][
                                x + player.pos.x
                            ] = [
                                value + "S",
                                `${player.collided ? "merged" : "clear"}`,
                            ];
                        }
                    });
                });
            }

            //Emit the wall
            console.log("rowscleared", rowsCleared);
            if (rowsCleared > 1) {
                console.log("wallllllllllllllllllllll");
                dispatch(addWallRequest());

                // socket.emit("addWall", { room: roomName, userName: userName });
            }

            // Then draw the tetromino
            // console.log("player and next to draw", player.tetromino, nextPiece.tetromino)
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? "merged" : "clear"}`,
                        ];
                    }
                });
            });

            // Then draw the next tetromino
            nextPiece.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        nextStage[y][x] = [
                            value,
                            `${nextPiece.collided ? "merged" : "clear"}`,
                        ];
                    }
                });
            });

            // Then check if we got some score if collided
            if (player.collided && !gameOver) {
                // console.log("call to reset from stage")
                resetPlayer(newStage);
                setNextStage(createStage(4, 4));
                return sweepRows(newStage);
            }
            return newStage;
        };

        // Here are the updates
        setStage(updateStage(stage));
    }, [
        player.collided,
        player.pos.x,
        player.pos.y,
        player.tetromino,
        resetPlayer,
        nextStage,
    ]);

    return [stage, setStage, rowsCleared, nextStage, setNextStage];
};
