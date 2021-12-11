const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

const moviesRouter = require('./routes/movies.route');

app.use('/movies', moviesRouter);

const port = 3000;

app.listen(port, () => {
    console.log(`App Rodando na porta ${port}`);
})
