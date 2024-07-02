import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SortParams } from './api';
import { renderMoviesPage } from './templates';

import './styles/styles.css';

// TODO render your app here

const startPage = 1;
let currentPage = 1;
const moviesSortSelector: NodeListOf<HTMLInputElement> = document.querySelectorAll('.btn-check');
let moviesSortSelectorActive = document.querySelector('.btn-check[checked]') as HTMLInputElement;
const loadMore = document.getElementById('load-more') as HTMLButtonElement;
const searchInput = document.getElementById('search') as HTMLInputElement;
const searchButton = document.getElementById('search-submit') as HTMLButtonElement;

renderMoviesPage(moviesSortSelectorActive.id as SortParams, { page: startPage });

moviesSortSelector.forEach((button) => {
    button.addEventListener('change', async () => {
        if (button.checked) {
            const sort = button.id as SortParams;
            await renderMoviesPage(sort, { page: startPage });
            moviesSortSelectorActive = button;
            currentPage = 1;
            searchInput.value = '';
        }
    });
});

loadMore.addEventListener('click', async () => {
    const sort = moviesSortSelectorActive.id as SortParams;
    const searchValue = searchInput.value;
    await renderMoviesPage(searchValue ? 'search' : sort, { page: currentPage, query: searchValue });
    currentPage += 1;
});

searchButton.addEventListener('click', async () => {
    const searchValue = searchInput.value;
    if (searchValue) {
        await renderMoviesPage('search', {
            page: startPage,
            query: searchValue,
        });
        currentPage = 1;
    }
});
