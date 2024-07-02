import { QueryParams, Search, SortParams, getMovies } from './api';

interface Results {
    poster_path: string;
    overview: string;
    release_date: string;
}

const IMG_URL = 'https://image.tmdb.org/t/p/original/';

const moviesContainer = document.getElementById('film-container') as HTMLDivElement;
const movieCardTemplate = moviesContainer.querySelector('div') as HTMLDivElement;

const fillMovieCard = (item: Results) => {
    const movieImage = movieCardTemplate.querySelector('img') as HTMLImageElement;
    movieImage.src = IMG_URL + item.poster_path;
    const cardText = movieCardTemplate.querySelector('.card-text') as HTMLParagraphElement;
    cardText.innerHTML = item.overview;
    const releaseDate = movieCardTemplate.querySelector('.text-muted') as HTMLElement;
    releaseDate.innerHTML = item.release_date;
    return movieCardTemplate.cloneNode(true);
};

export const renderMoviesPage = async (list: SortParams | Search, queryParams: QueryParams): Promise<void> => {
    moviesContainer.innerHTML = '';
    const moviesOnPage = await getMovies(list, queryParams);
    const moviesCard: HTMLDivElement[] = moviesOnPage.results.map(fillMovieCard);
    moviesCard.map((item) => moviesContainer.appendChild(item));
};
