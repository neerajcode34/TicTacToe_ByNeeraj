import React, { useState } from "react";
import "./App.css"; // Import the CSS file for the entire app
import TicTacToe from "./TicTacToe"; // Import the TicTacToe component
import Footer from "./Footer";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [startGame, setStartGame] = useState(false);

  const handleStartGame = () => {
    if (player1Name.trim() !== "" && player2Name.trim() !== "") {
      setShowWelcome(false);
      setStartGame(true);
    }
  };

  const isPlayButtonDisabled =
    player1Name.trim() === "" || player2Name.trim() === "";

  const handleGoToHomePage = () => {
    setShowWelcome(true); // Show the welcome page again
    setStartGame(false); // Reset the game state
  };

  return (
    <div className="App">
      <main className="App-main">
        {showWelcome ? (
          <div className="welcome-page">
            <h2>Welcome to Tic Tac Toe</h2>
            <div className="player-names">
              <div className="player-name">
                <input
                  type="text"
                  placeholder="Enter Player 1's Name"
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                />
              </div>
              <div className="player-name">
                <input
                  type="text"
                  placeholder="Enter Player 2's Name"
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                />
              </div>
            </div>
            <button
              className="lets-play-button"
              onClick={handleStartGame}
              disabled={isPlayButtonDisabled}
            >
              Let's Play
            </button>
          </div>
        ) : (
          <TicTacToe
            player1Name={player1Name}
            player2Name={player2Name}
            startGame={startGame}
            goToHomePage={handleGoToHomePage}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
