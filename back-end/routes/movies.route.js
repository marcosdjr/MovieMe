const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies.controller');

router.get('/', moviesController.getMovies)

router.get('/:id', moviesController.getMoviesById)

router.post('/add', moviesController.postMovie)

router.put('/edit/:id', moviesController.putMovie)

router.delete('/delete/:id', moviesController.deleteMovie)


// exporto as rotas para serem ultilizadas no index
module.exports = router;

