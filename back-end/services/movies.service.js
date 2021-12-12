const movies = [
    {
        id: 1,
        title: "Titanic",
        genre: "Drama",
        rating: "9",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwOnVuMjN7lRG-Gh0lnyDlkNH6wDhuhEx1ASChg_vzgZTQLf1tGtKzLOPQVoVvo0a4ZMA&usqp=CAU",
        status: "Assistido",
    },
    {
        id: 2,
        title: "Amélie",
        genre: "Drama",
        rating: "9",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkxqM7IVMUXsAOF-M-3Wqei8st7dbwB0lrv0FMk3yrZgFhXJ22BWNHp53lp_eEGcHHmwE&usqp=CAU",
        status: "Assistido",
    },
    {
        id: 3,
        title: "Quem quer ser um milionário",
        genre: "Drama",
        rating: "9",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ32a1CI46JTJT5NlSRvRRTzel9h6XitSK4xWUp6h0OtzRkVVbZYhM5tAAHQvTsSc12u00&usqp=CAU",
        status: "Assistido",
    }
]

const getMoviesService = () => {
    return movies
}

const getMoviesByIdService = (idParam) => {
    return movies.find((movie) => movie.id == idParam)
}

const addMovie = (newMovie) => {
    const newId = movies.length + 1;
    newMovie.id = newId;
    movies.push(newMovie);
    return newMovie;
}

const putMovie = (idParam, edit) => {
  

    const index = movies.findIndex((movie) => movie.id == idParam);

    if(index >= 0) {
        movies[index] = {
            ...movies[index],
            ...edit
        }
        
        return true
    } else {
        return false
    }
}

const deleteMovie = (idParam) => {
    if(!idParam) {
        return
    }
    const index = movies.findIndex((movie) => movie.id == idParam)
    const deleted = movies[index];
    movies.splice(index, 1)
    return deleted;
}

module.exports = {
    getMoviesService,
    getMoviesByIdService,
    addMovie,
    putMovie,
    deleteMovie
}
