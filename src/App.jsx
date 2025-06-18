// my-react-app/src/App.jsx
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Movie from './components/movie.jsx'; // Importing the Movie component
import PlayerCard from './components/playerCard.jsx';
import playerPortraitImage from './assets/playerportrait.png';

function App() {
  const [data, setData] = useState([])
  const [averageArray, setAverageArray] = useState([]);
  const playerData = {
    portrait: playerPortraitImage, // Or a URL
    name: 'LeBron James 🇮🇱',
    teamName: 'Los Angeles Lakers',
    age: 39,
    stats: [
      { name: 'Rating', value: 0, good: true },
      { name: 'DPR', value: 0, good: true },
      { name: 'KDR', value: 0, good: false },
      { name: 'HS%', value: 0, good: true },
      { name: 'ADR', value: 0, good: false },
      { name: 'KPR', value: 0, good: false },
    ],
  };

  async function getPlayer() {
    const url = '/api/data';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Data fetched successfully:', result.data);
        getAverages(result.data);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }     
}
function getAverages(data) {
  //totals
  let totalRating = 0;
  let totalDeaths = 0;
  let totalKDR = 0;
  let totalHS = 0;
  let totalADR = 0;
  let totalKills = 0;
  let totalRounds = 0;
  //finals
  let finalrating = 0;
  let finalDPR = 0;
  let finalKDR = 0;
  let finalHSP = 0;
  let finalADR = 0;
  let finalKPR = 0;
  if (!data || data.length === 0) {
    console.error('No data available to calculate averages.');
    return;
  }
  for(let i = 0; i < data.length; i++) {
    totalRating += parseFloat(data[i].Rating);
    totalHS += parseFloat(data[i]["HS%"]);
    totalADR += parseFloat(data[i].ADR);

    //get total rounds for game
    let score = data[i].Score
    let [a,b] = score.split(':').map(Number);
    totalRounds += (a + b);
    console.log(totalRounds);

    totalDeaths += parseFloat(data[i].Deaths);
    totalKills += parseFloat(data[i].Kills);
    
  }
  finalKDR = totalKills / totalDeaths;
  finalrating = totalRating / data.length;
  finalDPR = totalDeaths / totalRounds;
  finalHSP = totalHS / data.length;
  finalADR = totalADR / data.length;
  finalKPR = totalKills / totalRounds;
  console.log(`Total Rounds: ${totalRounds}`);
  console.log(`Total Kills: ${totalKills}`);
  console.log(`Total Deaths: ${totalDeaths}`);
  console.log(`Average Rating: ${finalrating.toFixed(2)}`);
  console.log(`Average DPR: ${finalDPR.toFixed(2)}`);
  console.log(`Average KDR: ${finalKDR.toFixed(2)}`);
  console.log(`Average HS: ${finalHSP.toFixed(2)}`);
  console.log(`Average ADR: ${finalADR.toFixed(2)}`);
  console.log(`Average KPR: ${finalKPR.toFixed(2)}`);

  // Build the averages object in the same shape as playerData
  const averages = {
    portrait: playerPortraitImage,
    name: 'George Huot 🇮🇱',
    teamName: 'FaZe Clan',
    age: '22',
    stats: [
      { name: 'Rating', value: Number(finalrating.toFixed(2)), good: true },
      { name: 'DPR', value: Number(finalDPR.toFixed(2)), good: true },
      { name: 'KDR', value: Number(finalKDR.toFixed(2)), good: false },
      { name: 'HS%', value: Number(finalHSP.toFixed(2)), good: true },
      { name: 'ADR', value: Number(finalADR.toFixed(2)), good: false },
      { name: 'KPR', value: Number(finalKPR.toFixed(2)), good: false }
    ],
  };
  setAverageArray(averages);
}
  return (
    <>
      <div className="App">
      <PlayerCard player={averageArray.stats  ? averageArray : playerData}/>
      <button onClick={getPlayer}>Fetch Player Data</button>
      {/* You can render multiple PlayerCards with different data */}
    </div>
    </>
  );
}

export default App;