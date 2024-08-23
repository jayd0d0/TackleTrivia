import React, { useState } from 'react';
import StartPage from './pages/StartPage';
import PlayerSelectionGame from './pages/PlayerSelectionGame';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

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
            <Analytics />
            <SpeedInsights />
            {!gameStarted ? (
                <StartPage onStart={handleStartGame} />
            ) : (
                <PlayerSelectionGame onReset={handleResetGame} />
            )}
        </div>
    );
}

export default App;
