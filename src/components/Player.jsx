import React from 'react';
import {useState} from 'react';

const Player = () => {
    const [data, setData] = useState([])

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
        console.log('Data fetched successfully:', result);
        setData(result);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }     
}
    return (
        <div>
            <h1>get player data</h1>
            <button onClick={getPlayer}>click</button>
            <p>{data && Object.keys(data).length > 0 ? JSON.stringify(data.data[0]) : null}</p>
        </div>
    );
};

export default Player;