import React from "react";
import Square from "./Square";
import "./Board.css";
import { calculateWinner } from "../helpers/calculateWinner";

export default function Board({
  playerMovePositions,
  currentPlayer,
  setCurrentPlayer,
  setPlayerMovePosition,
  isOver,
  setGameOver,
}) {
  function handleClick(index) {
    //use a copy of the state to not mutate the state directly.
    if (!isOver) {
      const playerMoves = [...playerMovePositions];

      if (currentPlayer === "X") {
        playerMoves[index] = "X";
        setCurrentPlayer("O");
      } else {
        playerMoves[index] = "O";
        setCurrentPlayer("X");
      }

      setPlayerMovePosition(playerMoves);

      if (checkWinner()) {
        alert(`${currentPlayer} has won the game!`);
        stopGame();
        return;
      }
    } else {
      alert("The game is over. Restart it to play again.");
    }
  }

  function checkWinner() {
    let winner = calculateWinner(playerMovePositions);
    if (winner) {
      return true;
    }
  }

  function stopGame() {
    setGameOver(true);
  }

  return (
    <div>
      <h2>{currentPlayer} its your turn.</h2>
      <div className="board">
        {playerMovePositions.map((square, index) => {
          return (
            <Square
              value={index}
              key={index}
              action={handleClick}
              currentPlayer={currentPlayer}
              playerMovePositions={playerMovePositions}
            />
          );
        })}
      </div>
    </div>
  );
}
