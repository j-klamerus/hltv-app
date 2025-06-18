// my-react-app/src/App.jsx
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import PlayerCard from './components/playerCard.jsx';
import defaultAvatar from './assets/avatar-default-svgrepo-com.svg'

function App() {
  const [data, setData] = useState([])
  const [averageArray, setAverageArray] = useState([]);
  const playerData = {
    portrait: defaultAvatar, // Or a URL
    name: '',
    teamName: '',
    age: 0,
    stats: [
      { name: 'Rating', value: 0, good: false },
      { name: 'DPR', value: 0, good: false },
      { name: 'KDR', value: 0, good: false },
      { name: 'HS%', value: 0, good: false },
      { name: 'ADR', value: 0, good: false },
      { name: 'KPR', value: 0, good: false },
    ],
  };

  async function getPlayer(playerName) {
    const url = `/api/data/?name=${playerName}`;
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
        getAverages(result.data, playerName);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }     
}
function getAverages(data, playerName) {
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
    portrait: `${playerName}.png`,
    name:  `${playerName} 🇺🇸`,
    teamName: 'FaZe Clan',
    age: '22',
    stats: [
      { name: 'Rating', value: Number(finalrating.toFixed(2)), good: true },
      { name: 'DPR', value: Number(finalDPR.toFixed(2)), good: true },
      { name: 'KDR', value: finalKDR.toFixed(2), good: false },
      { name: 'HS%', value: Number(finalHSP.toFixed(2)), good: true },
      { name: 'ADR', value: Number(finalADR.toFixed(2)), good: false },
      { name: 'KPR', value: finalKPR.toFixed(2), good: false }
    ],
  };
  if (finalrating > 1) {
  averages.stats[0].good = true;
} else {
  averages.stats[0].good = false;
}

if (finalDPR < 0.67) {
  averages.stats[1].good = true;
} else {
  averages.stats[1].good = false;
}

if (finalKDR > 1) {
  averages.stats[2].good = true;
} else {
  averages.stats[2].good = false;
}

if (finalHSP > 60) {
  averages.stats[3].good = true;
} else {
  averages.stats[3].good = false;
}

if (finalADR > 75) {
  averages.stats[4].good = true;
} else {
  averages.stats[4].good = false;
}

if (finalKPR > 0.74) {
  averages.stats[5].good = true;
} else {
  averages.stats[5].good = false;
}
  console.log(averages);
  setAverageArray(averages);
}
  return (
    <>
      <div className="App">
      <PlayerCard player={averageArray.stats  ? averageArray : playerData}/>
      <button onClick={() => {getPlayer("jacob")}}>Jacob</button>
      <button onClick={() => {getPlayer("george")}}>George</button>
      <button onClick={() => {getPlayer("colton")}}>Colton</button>
      <button onClick={() => {getPlayer("kyle")}}>Kyle</button>
      <button onClick={() => {getPlayer("kaleb")}}>Kaleb</button>
      <button onClick={() => {getPlayer("aidan")}}>Aidan</button>
      <button onClick={() => {getPlayer("jucc")}}>Jack</button>
      {/* You can render multiple PlayerCards with different data */}
    </div>
    </>
  );
}

export default App;