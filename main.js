// API SETTINGS

const API_KEY = 'api_key=c7e3c1ed0adbe584c7995e90d824d373&language=fr';

const BASE_URL = 'https://api.themoviedb.org/3';

// const url_movies = '/discover/movie?sort_by=popularity.desc&';

const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const searchURL = BASE_URL + '/search/movie?' + API_KEY;

// console.log(URL_TRAILER);

// const trailer = trailer.find()

const wrapper = document.getElementById('wrapper');
const form = document.getElementById('form');
const search = document.getElementById('search');

takeM(API_URL);

function takeM(url) {
    
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data) {
    // Declare necessary variables
    const wrapper = document.getElementById('wrapper');

    // Clear previous content
    wrapper.innerHTML = '';

    // Loop through each movie in the data array
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        const URL_TRAILER = `${BASE_URL}/movie/${id}?${API_KEY}&append_to_response=videos`;

        // Create a new div element for the current movie
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title} movie poster">
            <div class="descriptions">  
                <h1>${title}</h1>
                <p id="overview">${overview}</p>
                <div id="eval">
                    <button id="btn_trailer">
                        <p>Bande annonce</p>
                        <box-icon name='youtube' type='logo' color='#ffff' ></box-icon>
                    </button>
                    <div id="bckground-vote">
                        <p id="vote">${vote_average.toFixed(1)}</p>
                    </div>
                </div>
            </div>`;

        console.log(URL_TRAILER);

        // Append the movie div to the wrapper
        wrapper.appendChild(cardEl);

        // Fetch the trailer data for the current movie
        fetch(URL_TRAILER)
            .then(res => res.json())
            .then(data => {
                // Get the first trailer video key
                const videoLink = data.videos.results[0].key;
                // Set the trailer link href for the current movie
                const trailerLink = cardEl.querySelector('#btn_trailer');
                trailerLink.href = `https://www.youtube.com/watch?v=${videoLink}`;
                // Add event listener to the trailer button for the current movie
                trailerLink.addEventListener('click', e => {
                    e.preventDefault();
                    window.location.href = trailerLink.href;
                });
            })
    });
}




form.addEventListener('submit', e => {
    e.preventDefault();

    const searchFilm = search.value;

    if (searchFilm) {
        takeM(searchURL + '&query=' + searchFilm);
    } else takeM(API_URL)
})




// filmValue

// const all = document.getElementById('all')

// const DETAILS = document.createElement('div');
// DETAILS.classList.add('details');
// DETAILS.innerHTML = `
// <div class="deux">
// <div class="img_control">
//     <img src="${IMG_URL + poster_path}" alt="${title}">
// </div>
// </div>
// <div class="deuxx">
// <div class="desc">
//     <div>
//         <h1>${title}</h1>
//         <p id="overview2">${overview}</p>
//     </div>
//     <div id="eval">
//         <button>
//             <p>Bande annonce</p>
//             <box-icon name='youtube' type='logo' color='#ffff' ></box-icon>
//         </button>
//         <div id="bckground-vote">
//             <p id="vote">${vote_average}</p>
//         </div>
//     </div>
// </div>
// </div>
// `
// all.appendChild(DETAILS)

