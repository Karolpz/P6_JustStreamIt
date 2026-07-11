async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:8000/api/v1/genres/?page_size=25');
        const categories = await response.json();
        return categories.results;
    } catch (error) {
        console.error('Erreur dans la récupération des catégories:', error);
        throw error;
    }
}