import React from 'react';

async function getMovies() {
    const url = 'http://localhost:3001/api/message';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Movies fetched successfully:', data);
        })
        .catch(err => {
            console.error('Error fetching movies:', err);
        });
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