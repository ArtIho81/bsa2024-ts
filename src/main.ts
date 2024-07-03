import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SortParams } from './api';
import { renderMoviesPage } from './movie-page';
import { getHTMLElement } from './helpers';

import './styles/styles.css';

// TODO render your app here
enum ButtonSelectors {
    nextPage = '#load-more',
    search = '#search-submit',
}

enum InputSelectors {
    sortSelector = '.btn-check',
    sortSelectorChecked = '.btn-check[checked]',
    search = '#search',
}

const startPage = 1;
let currentPage = 1;
const moviesSortSelector: NodeListOf<HTMLInputElement> = document.querySelectorAll(InputSelectors.sortSelector);
let moviesSortSelectorActive = getHTMLElement(document, InputSelectors.sortSelectorChecked) as HTMLInputElement;
const loadMore = getHTMLElement(document, ButtonSelectors.nextPage) as HTMLButtonElement;
const searchInput = getHTMLElement(document, InputSelectors.search) as HTMLInputElement;
const searchButton = getHTMLElement(document, ButtonSelectors.search) as HTMLButtonElement;

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
