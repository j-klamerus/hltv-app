// my-react-app/src/App.jsx
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import PlayerCard from './components/playerCard.jsx';
import defaultAvatar from './assets/avatar-default-svgrepo-com.svg'
import Loading from './components/Loading.jsx';

function App() {
  const [data, setData] = useState([])
  const [averageArray, setAverageArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const playerData = {
    portrait: defaultAvatar, 
    name: '',
    ign: '',
    teamName: '',
    age: 0,
    stats: [
      { name: 'Rating', value: 0, status: "bad" },
      { name: 'DPR', value: 0, status: "bad" },
      { name: 'KDR', value: 0, status: "bad" },
      { name: 'HS%', value: 0, status: "bad" },
      { name: 'ADR', value: 0, status: "bad" },
      { name: 'KPR', value: 0, status: "bad" },
    ],
  };

  async function getPlayer(playerName) {
    setIsLoading(true);
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
        setIsLoading(false);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }     
}
function getAverages(data, playerName) {
  let imageName = playerName;
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

  // make averges object
  const averages = {
    portrait: `${imageName}.png`,
    name:  `${playerName} 🇺🇸`,
    teamName: 'FaZe Clan',
    age: '22',
    stats: [
      { name: 'Rating', value: Number(finalrating.toFixed(2)), status: "true" },
      { name: 'DPR', value: Number(finalDPR.toFixed(2)), status: "true" },
      { name: 'KDR', value: finalKDR.toFixed(2), status: "true" },
      { name: 'HS%', value: Number(finalHSP.toFixed(2)), status: "true" },
      { name: 'ADR', value: Number(finalADR.toFixed(2)), status: "true" },
      { name: 'KPR', value: finalKPR.toFixed(2), status: "true" }
    ],
  };
  if (finalrating > 1.1) {
  averages.stats[0].status = "good";
} else if (finalrating > 1) {
  averages.stats[0].status = "okay";
} else {
  averages.stats[0].status = "bad";
}

if (finalDPR < 0.66) {
  averages.stats[1].status = "good";
} else if (finalDPR < 0.71) {
  averages.stats[1].status = "okay";
} else {
  averages.stats[1].status = "bad";
}

if (finalKDR > 1.1) {
  averages.stats[2].status = "good";
} else if (finalKDR > 0.99) {
  averages.stats[2].status = "okay";
} else {
  averages.stats[2].status = "bad";
}

if (finalHSP > 60) {
  averages.stats[3].status = "good";
} else if (finalHSP > 50) {
  averages.stats[3].status = "okay";
} else {
  averages.stats[3].status = "bad";
}

if (finalADR > 75) {
  averages.stats[4].status = "good";
} else if (finalADR > 65) {
  averages.stats[4].status = "okay";
} else {
  averages.stats[4].status = "bad";
}

if (finalKPR > 0.74) {
  averages.stats[5].status = "good";
} else if (finalKPR > 0.65) {
  averages.stats[5].status = "okay";
} else {
  averages.stats[5].status = "bad";
}
switch(playerName) {
  case "jacob":
    averages.ign = "hendon hooker"
    averages.name = "Jacob Klamerus 🇺🇸"
    averages.age = 22
    break
  case "george":
    averages.ign = "who"
    averages.name = "George Huot 🇮🇱"
    averages.age = 22
    break
  case"aidan":
    averages.ign = "wowbugasshair"
    averages.name = "Aidan Juengel 🇺🇸"
    averages.age = 22
    break
  case "jucc":
    averages.ign = "JuccOP"
    averages.name = "Jack Cetlinski 🇺🇸"
    averages.age = 22
    break;
  case "colton":
    averages.ign = "Beerusoomafoo"
    averages.name = "Colton Terrian 🇺🇸"
    averages.age = 23
    break;
  case "kaleb":
    averages.ign = "kaleB"
    averages.name = "Kaleb Bailey 🇺🇸"
    averages.age = 23
    break;
  case "kyle":
    averages.ign = "Toaster"
    averages.name = "Kyle Lewis 🇺🇸"
    averages.age = 24
    break;
}
  console.log(averages);
  setAverageArray(averages);
}
  return (
    <>
      <div className="App">
      <>
        {isLoading ? <Loading/> : null}
      </>
      <PlayerCard player={averageArray.stats  ? averageArray : playerData}/>
      <button onClick={() => {getPlayer("jacob")}}>Jacob</button>
      <button onClick={() => {getPlayer("george")}}>George</button>
      <button onClick={() => {getPlayer("colton")}}>Colton</button>
      <button onClick={() => {getPlayer("kyle")}}>Kyle</button>
      <button onClick={() => {getPlayer("kaleb")}}>Kaleb</button>
      <button onClick={() => {getPlayer("aidan")}}>Aidan</button>
      <button onClick={() => {getPlayer("jucc")}}>Jack</button>
    </div>
    </>
  );
}

export default App;