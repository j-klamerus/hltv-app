import React from 'react';

async function getMovies() {
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
        const data = await response.json();
        console.log('Data fetched successfully:', data);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }     
}

const Movie = () => {
    
    return (
        <div>
            <h1>Movie Component</h1>
            <button onClick={getMovies}>click</button>
        </div>
    );
};

export default Movie;