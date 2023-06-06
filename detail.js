const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmVjM2U3MzdhYzIyZDQxOGExZTBmNGRmZTEzNTY3ZiIsInN1YiI6IjY0NzFiZjQ0YmUyZDQ5MDExNmM4YTk2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JvZ2uXWJg9pC1AfqkJeUENhOZIGdg7e9flH1BDoX6ME",
  },
};

fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
  .then((response) => response.json())
  .then((data) => {
    let results = data["results"];
    let title = data["title"];
    let id = data["id"];
    let overview = data["overview"];
    let date = data["release_date"];
    let average = data["vote_average"];
    let poster = `https://image.tmdb.org/t/p/w200` + data["poster_path"];

    const movieDetailInfo = document.createElement("div");
    movieDetailInfo.innerHTML = `<img src=${poster} alt="Movie Poster">
                                <h2>${title}</h2>
                                <span>${overview}</span>
                                <p>개봉 ${date} 평점 ${average}</p>`;
    movieDetail.appendChild(movieDetailInfo);
  });
