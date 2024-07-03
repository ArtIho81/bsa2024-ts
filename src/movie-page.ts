import { QueryParams, Search, SortParams, getMovies } from './api';
import { IMG_URL, ResponseResults, Tags } from './config';
import { getHTMLElement } from './helpers';
import { createRandomMovieBanner } from './random-movie';

enum MovieCardSelectors {
    container = '#film-container',
    cardText = '.card-text',
    releaseDate = '.text-muted',
}

const moviesContainer = getHTMLElement(document, MovieCardSelectors.container) as HTMLDivElement;
const movieCardTemplate = getHTMLElement(moviesContainer, Tags.div) as HTMLDivElement;

const fillMovieCard = (item: ResponseResults) => {
    const movieImage = getHTMLElement(movieCardTemplate, Tags.img) as HTMLImageElement;
    movieImage.src = IMG_URL + item.poster_path;
    const cardText = getHTMLElement(movieCardTemplate, MovieCardSelectors.cardText) as HTMLParagraphElement;
    cardText.innerHTML = item.overview;
    const releaseDate = getHTMLElement(movieCardTemplate, MovieCardSelectors.releaseDate) as HTMLElement;
    releaseDate.innerHTML = item.release_date;
    return movieCardTemplate.cloneNode(true);
};

export const renderMoviesPage = async (list: SortParams | Search, queryParams: QueryParams): Promise<void> => {
    moviesContainer.innerHTML = '';
    const moviesOnPage = await getMovies(list, queryParams);
    const moviesCard: Node[] = moviesOnPage.results.map(fillMovieCard);
    moviesCard.map((item) => moviesContainer.appendChild(item));
    createRandomMovieBanner(moviesOnPage.results);
};
