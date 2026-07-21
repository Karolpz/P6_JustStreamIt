async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:8000/api/v1/genres/?page_size=25')
        const categories = await response.json()
        return categories.results
    } catch (error) {
        console.error('Erreur dans la récupération des catégories:', error)
        throw error
    }
}

async function fetchTopMovies() {
    try {
        const response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7')
        const data = await response.json()
        return data.results
    } catch (error) {
        console.error('Erreur lors de la récupération des films les mieux notés:', error)
        return []
    }
}

async function fetchMoviesDetails(movieId) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/titles/${movieId}`)
        const movieDetails = await response.json()
        return movieDetails
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du film:', error)
        throw error
    }   
}