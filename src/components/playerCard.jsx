import React from 'react';
import './PlayerCard.css'; // We'll create this CSS file

const PlayerCard = ({ player }) => {
  const {
    portrait,
    name,
    ign,
    teamName,
    age,
    stats // This should be an array of objects, e.g., [{ name: 'Points', value: 25, good: true }, ...]
  } = player;

  return (
    <div className="player-card">
      <div className="player-portrait-container">
        <img src={portrait} alt={`${name}'s portrait`} className="player-portrait" />
      </div>
      <div className="player-info-and-stats">
        <div className="player-info">
          <h2 className="player-name">{ign}</h2>
          <p className="player-team">{name}</p>
          <p className="player-team">{teamName}</p>
          <p className="player-age">Age: {age}</p>
        </div>
        <div className="player-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <p className="stat-name">{stat.name}</p>
              <p className="stat-value">{stat.value}</p>
              {/* The meter beneath the stat */}
              {/*<div className={`stat-meter ${stat.good ? 'good' : 'bad'}`}></div>*/}
              <div className={`stat-meter ${stat.status}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;