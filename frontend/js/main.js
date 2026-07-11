document.querySelectorAll('.btn-voir-plus').forEach(button => {
    button.addEventListener('click', function () {
        const section = this.closest('section');
        const hiddenMovies = section.querySelectorAll('.col-12.d-none');
        const isExpanded = this.textContent.trim() === 'Voir moins';

        hiddenMovies.forEach(movie => {
            movie.classList.toggle('show-extra');
        });

        this.textContent = isExpanded ? 'Voir plus' : 'Voir moins';
    });
});

async function getCategories() {
        const categories = await fetchCategories();

        const select = document.getElementById('category-select');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            select.appendChild(option);
        });
    }

getCategories();