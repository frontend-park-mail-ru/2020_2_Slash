const selectRandomMovie = (moviesArraysList: any[]): any => {
    let movies: any[] = [];

    moviesArraysList.map((moviesArray) => {
        movies = movies.concat(moviesArray);
    });

    return movies[Math.floor(Math.random() * movies.length)];
};

export default selectRandomMovie;
