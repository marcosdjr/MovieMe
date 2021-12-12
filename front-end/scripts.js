const apiUrl = "http://localhost:3000";
let edit = false;
let editId = 0;

const list = document.getElementById("info-movie");

const getMovies = async () => {

  const response = await fetch(`${apiUrl}/movies`);
  const movies = await response.json();
  
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
    const check = document.getElementById('status').checked;
    const image = document.getElementById('image').value;
    console.log(check);
    
    if(check != true) {
        var status = "Não Assistido"
    } 
    else {
        var status = "Assistido"
    }

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

const movieEdit = async (id) => {

    edit = true;
    editId = id;

    const movie = await getById(id);
    console.log(movie.status)

    if(movie.status != "Assistido") {
        var check = false
        var check2 = true
    } 
    else {
        var check  = true
        var check2 = false
    }

    document.getElementById('title').value = movie.title;
    document.getElementById('genre').value  = movie.genre;
    document.getElementById('rating').value = movie.rating;
    document.getElementById('status').checked = check;
    document.getElementById('status2').checked = check2;
    document.getElementById('image').value = movie.image;

}


const getById = async (id) => {

    const response = await fetch(`${apiUrl}/movies/${id}`)
    const movie = await response.json();
    return movie
}

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
    document.getElementById('status').checked = false;
    document.getElementById('status2').checked = false;

}

