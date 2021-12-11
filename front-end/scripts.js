const apiUrl = "http://localhost:3000";
let edit = false;
let editId = 0;

// estou mapeando o elemento lista (<table></table>) do html.
const list = document.getElementById("info-movie");

// crio uma funcao onde é possivel realizar uma requisicao [GET] para a api que retorna uma lista de vagas
const getMovies = async () => {

  const response = await fetch(`${apiUrl}/movies`);
  const movies = await response.json();
  
  // itera a lista e para cada objeto ele pode fazer alguma coisa
  movies.map((movie) => {
    list.insertAdjacentHTML(
      "beforeend",
      `
        <div id="movie">
            <div id="div-img">
                <img 
                id="movie-cover"
                src="${movie.image}" 
                alt="Image" 
                />
            </div>
            <div id="div-info">
              <h3 for="title" id="title"> Título: ${movie.title}</h3>
              <h3 for="genre" id="genre"> Gênero: ${movie.genre}</h3>
              <h3 for="rating" id="rating"> Nota: ${movie.rating}</h3>
              <h3 for="status" id="status"> Status: ${movie.status}</h3>
              <div>
                <button class="btn btn-primary" onclick="movieEdit(${movie.id})">Editar</button>
                <button class="btn btn-danger" onclick="deleteMovie(${movie.id})">Deletar</button>
              </div>
            </div>
        </div>

        `
    );
  });
};

getMovies();



const submit = async () => {

    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const rating = document.getElementById('rating').value;
    const status = document.getElementById('status').value;
    const image = document.getElementById('image').value;

    
    const movie = {
        title,
        genre,
        rating,
        status,
        image
    }
    
    if(edit) {
        putMovie(movie);
    }else {
        postMovie(movie);
    }
    
}




const postMovie = async (movie) => {

    const response = await fetch(`${apiUrl}/movies/add`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    })
    const data = await response.json();
    alert(data.message);
    list.innerHTML = '';
    getMovies();
    reset();
}

// [PUT] http://localhost:3000/vagas/edit/{id} - recebe o objeto transforma em json e envia para a api juntamente com o seu id para que possa
// ser editado
const putMovie = async (movie) => {

    const response = await fetch(`${apiUrl}/movies/edit/${editId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    })
    const data = await response.json();
    alert(data.message);
    list.innerHTML = '';
    getMovies();
    reset();

    edit = false;
    editId = 0;
}

// preenche os dados do formulario de acordo com a vaga encontrada no backend pelo seu id
const movieEdit = async (id) => {

    edit = true;
    editId = id;

    const movie = await getById(id);

    document.getElementById('title').value = movie.title;
    document.getElementById('genre').value  = movie.genre;
    document.getElementById('rating').value = movie.rating;
    document.getElementById('status').value = movie.status;
    document.getElementById('image').value = movie.image;


}


// recebe um id e faz a chamada para a api e retorna o objeto encontrado
const getById = async (id) => {

    const response = await fetch(`${apiUrl}/movies/${id}`)
    const movie = await response.json();
    return movie
}

//[DELETE] http://localhost:3000/vagas/delete/1 Recebo um id e excluo a vaga do backend
const deleteMovie = async (id) => {
    const response = await fetch(`${apiUrl}/movies/delete/${id}`, {
        method: 'DELETE'
    })
    const result = await response.json();
    alert(result.message);
    
    list.innerHTML = '';
    reset();
    getMovies();
}

const reset = () => {

    document.getElementById('title').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('status').value = '';
    document.getElementById('image').value = '';

}

