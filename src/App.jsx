// my-react-app/src/App.jsx
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Movie from './components/movie.jsx'; // Importing the Movie component
import PlayerCard from './components/playerCard.jsx';
import playerPortraitImage from '/Users/klamerus/HOME/New App/making-something/src/assets/playerportrait.png';

function App() {
  const playerData = {
    portrait: playerPortraitImage, // Or a URL
    name: 'LeBron James 🇮🇱',
    teamName: 'Los Angeles Lakers',
    age: 39,
    stats: [
      { name: 'Points', value: 25.4, good: true },
      { name: 'Assists', value: 8.0, good: true },
      { name: 'Rebounds', value: 7.3, good: false },
      { name: 'Steals', value: 1.3, good: true },
      { name: 'Blocks', value: 0.7, good: false },
      { name: 'Efficiency', value: 28.5, good: true },
    ],
  };
  return (
    <>
      <div className="App">
      <h1>Player Roster</h1>
      <PlayerCard player={playerData} />
      <Movie></Movie>
      {/* You can render multiple PlayerCards with different data */}
    </div>
    </>
  );
}

export default App;