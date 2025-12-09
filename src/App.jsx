import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuizGame from './pages/QuizGame';
import Result from './pages/Result';
import Ranking from './pages/Ranking';

function App() {
  const [gameState, setGameState] = useState('home');
  const [playerName, setPlayerName] = useState('');
  const [finalScore, setFinalScore] = useState(0);

  const startGame = (name) => {
    setPlayerName(name);
    setGameState('playing');
  };

  const finishGame = (score) => {
    setFinalScore(score);
    setGameState('finished');
  };

  const restartGame = () => {
    setGameState('home');
    setPlayerName('');
    setFinalScore(0);
  };

  const openRanking = () => {
    setGameState('ranking');
  };

  return (
    <Layout>
      {gameState === 'home' && (
        <Home 
          onStart={startGame} 
          onOpenRanking={openRanking} 
        />
      )}
      
      {gameState === 'playing' && (
        <QuizGame 
          playerName={playerName} 
          onFinish={finishGame} 
        />
      )}
      
      {gameState === 'finished' && (
        <Result 
          score={finalScore} 
          playerName={playerName} 
          onRestart={restartGame} 
        />
      )}

      {gameState === 'ranking' && (
        <Ranking onBack={() => setGameState('home')} />
      )}
    </Layout>
  );
}

export default App;