const moviesService = require('../services/movies.service');

const getMovies = (req, res) => {
    const movies = moviesService.getMoviesService();
    res.send(movies);
}

const getMoviesById = (req, res) => {
    const id = req.params.id;
    const movie = moviesService.getMoviesByIdService(id);
    res.send(movie)
}

// vai cadastrar uma nova vaga de acordo com o obj vindo do front
const postMovie = (req, res) => {
    // quero validar os dados de entrada no backend
    if(!req.body || !req.body.title || !req.body.rating || !req.body.genre || !req.body.status) { 
        res.status(400).send({message: 'Filme inválido, por favor, preencha os campos'})
        return
    }

    const movie = req.body;
    const newMovie = moviesService.addMovie(movie);

    if(!newMovie.id) {
        res.status(500).send({message: "Ocorreu um erro, tente novamente"})
    }

    res.send({message: `Filme ${ newMovie.title } inserido com sucesso`})
}

// vai receber um obj (body) e um id(param) para poder atualizar a vaga com o objeto de acordo com o seu id
const putMovie = (req, res) => {
    if(!req.body || !req.body.title || !req.body.rating || !req.body.genre || !req.body.status) { 
        res.status(400).send({message: 'Tente novamente.'})
    }

    const idParam = req.params.id
    const movieEdit = req.body
    const edi = moviesService.putMovie(idParam, movieEdit);
    if(edi) {
        res.send({message: `Edição realizada com sucesso!`})
    } else {
        res.status(404).send({message: `Nao encontramos filme com esse id para editar`})
    }
}

const deleteMovie = (req, res) => {
    const id = req.params.id;
    const deleted = moviesService.deleteMovie(id);
    if(!deleted) {
        res.status(404).send({message: 'Nao foi possivel excluir, o id nao foi encontrado'})
    }
    res.send({message: `O filme ${deleted.title} foi excluido com sucesso`});
}




// exportando as funcoes para serem usadas nas rotas
module.exports = {
    getMovies,
    getMoviesById,
    postMovie,
    putMovie,
    deleteMovie
}