import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import PlayerSelectionGame from './pages/PlayerSelectionGame';

function App() {
    const [gameStarted, setGameStarted] = useState(false);

    const handleStartGame = () => {
        setGameStarted(true);
    };

    const handleResetGame = () => {
        setGameStarted(false);
    };

    return (
        <div>
            {!gameStarted ? (
                <StartPage onStart={handleStartGame} />
            ) : (
                <PlayerSelectionGame onReset={handleResetGame} />
            )}
        </div>
    );
}

export default App;
