import React, { useState } from "react";
import "./TicTacToe.css"; // Import the CSS file for styling
import Footer from "./Footer";

import moveSound from "./assets/move.mp3";
import gameOverSound from "./assets/gameOver.mp3"; // Import the game over sound file

const moveAudio = new Audio(moveSound);
const gameOverAudio = new Audio(gameOverSound);

function TicTacToe({ player1Name, player2Name, startGame, goToHomePage }) {
  const initialGameData = {
    board: Array(9).fill(null),
    xIsNext: true,
    winner: null,
    isDraw: false,
    winningLine: null, 
  };

  const [gameData, setGameData] = useState(initialGameData);

  const handleClick = (index) => {
    const { board, xIsNext, winner } = gameData;
  
    if (winner || board[index] !== null) {
      return; // If there's a winner or the square is already filled, do nothing
    }
  
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
  
    const newWinner = calculateWinner(newBoard);
    const isDraw = !newWinner && newBoard.every((square) => square !== null);
  
    const updatedGameData = {
      board: newBoard,
      xIsNext: !xIsNext, // Switch the turn here
      winner: newWinner,
      isDraw: isDraw,
      winningLine: calculateWinningLine(newBoard), // Calculate the winning line
    };
  
    // Update the game state with the new data before playing sound
    setGameData(updatedGameData);
  
    // Play moveAudio immediately after updating game state
    moveAudio.play();
  
    // Added sound effects
    setTimeout(() => {
      moveAudio.pause();
      moveAudio.currentTime = 0; // Reset audio playback position to start
    }, 400);
  
    if (newWinner || isDraw) {
      gameOverAudio.play();
    }
  };
  

  const handlePlayAgain = () => {
    // Reset the game by setting the game data back to its initial state
    setGameData(initialGameData);
  };

  const handleQuitGame = () => {
    // Call the goToHomePage function to navigate back to the first page
    goToHomePage();
  };

  const renderSquare = (index) => {
    const isWinningSquare =
      gameData.winningLine && gameData.winningLine.includes(index);

    return (
      <button
        className={`square${isWinningSquare ? " winning-square" : ""}`}
        onClick={() => handleClick(index)}
      >
        {gameData.board[index]}
      </button>
    );
  };

  return (
    <div className="game">
      <div className="game-header">
        <header className="tic-tac-toe-header">
          <h1>Tic Tac Toe</h1>
        </header>
      </div>
      <div className="game-content">
        <div className="game-board">
          {gameData.winner || gameData.isDraw ? (
            <div className="status result-container">
              {gameData.winner ? (
                <div>
                  <div>
                    Winner:{" "}
                    {gameData.winner === "X" ? player1Name : player2Name}
                  </div>
                  <div>
                    <button className="play-again" onClick={handlePlayAgain}>
                      Play Again
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div>It's a Draw!</div>
                  <div>
                    <button className="play-again" onClick={handlePlayAgain}>
                      Play Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="status">
              {startGame
                ? `Next player: ${gameData.xIsNext ? player1Name : player2Name}`
                : "Welcome to Tic Tac Toe"}
            </div>
          )}
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div>
          {gameData.winner || gameData.isDraw ? (
            <button className="quit-game" onClick={handleQuitGame}>
              Quit Game
            </button>
          ) : null}
        </div>
        <Footer />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

// Function to calculate the winning line
function calculateWinningLine(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }

  return null;
}

export default TicTacToe;

