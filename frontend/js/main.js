document.querySelectorAll('.btn-voir-plus').forEach(button => {
    button.addEventListener('click', function () {
        const section = this.closest('section')
        const hiddenMovies = section.querySelectorAll('.col-12.d-none')
        const isExpanded = this.textContent.trim() === 'Voir moins'

        hiddenMovies.forEach(movie => {
            movie.classList.toggle('show-extra')
        })

        this.textContent = isExpanded ? 'Voir plus' : 'Voir moins'
    })
})

document.querySelectorAll('.btn-detail').forEach(button => {
    button.addEventListener('click', async function () {
        const movieId = this.dataset.movieId;
        if (!movieId) return;

        try {
            const movie = await fetchMoviesDetails(movieId);

            document.getElementById('detailsModalLabel').textContent = movie.title;
            document.getElementById('modal-genre').textContent = `${movie.year} - ${movie.genres.join(', ')}`;
            document.getElementById('modal-duration').textContent = `${movie.rated} - ${movie.duration} minutes (${movie.countries.join(' / ')})`;
            document.getElementById('modal-score').textContent = `IMDB score: ${movie.imdb_score}/10`;
            document.getElementById('modal-boxoffice').textContent = `Recettes au box-office: ${movie.worldwide_gross_income ?? 'Non communiquées'}`;
            document.getElementById('modal-director').textContent = movie.directors.join(', ');
            document.getElementById('modal-summary').textContent = movie.long_description;
            document.getElementById('modal-cast').textContent = movie.actors.join(', ');
            document.getElementById('modal-img-desktop').src = movie.image_url;
            document.getElementById('modal-img-mobile').src = movie.image_url;

        } catch (error) {
            console.error('Impossible d\'afficher les détails du film:', error);
        }
    });
});

async function getCategories() {
    try {
        const categories = await fetchCategories()
        const select = document.getElementById('category-select')
        categories.forEach(category => {
            const option = document.createElement('option')
            option.value = category.name
            option.textContent = category.name
            select.appendChild(option)
        })
    } catch (error) {
        console.error('Impossible d\'afficher les catégories:', error)
    }
}

getCategories()

async function getBestMovie() {
    try {
        const topMovies = await fetchTopMovies()
        const bestMovie = topMovies[0]
        const movieDetails = await fetchMoviesDetails(bestMovie.id)

        document.getElementById('best-movie-title').textContent = movieDetails.title
        document.getElementById('best-movie-summary').textContent = movieDetails.description
        document.getElementById('best-movie-img').src = movieDetails.image_url
        document.getElementById('best-movie-btn').dataset.movieId = bestMovie.id;

    } catch (error) {
        console.error('Impossible d\'afficher le meilleur film:', error)
    }
}

getBestMovie()

async function getTopRatedMovies() {
    try {
        const topMovies = await fetchTopMovies()
        const otherMovies = topMovies.slice(1)

        otherMovies.forEach((movie, index) => {
            const position = index + 1

            document.getElementById(`top-movie-${position}-img`).src = movie.image_url
            document.getElementById(`top-movie-${position}-img`).alt = movie.title
            document.getElementById(`top-movie-${position}-title`).textContent = movie.title
            document.getElementById(`top-movie-${position}-btn`).dataset.movieId = movie.id
        })

    } catch (error) {
        console.error('Impossible d\'afficher les films les mieux notés:', error)
    }
}

getTopRatedMovies()