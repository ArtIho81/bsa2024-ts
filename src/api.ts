const API_KEY = '774a8b8ec5bdfb82ea4602f9b712a546';
const API_URL = 'https://api.themoviedb.org/3/';

export type Search = 'search';
export type SortParams = 'popular' | 'top_rated' | 'upcoming';
export type QueryParams = { page?: number; query?: string };

const createQuery = (queryParams: QueryParams) =>
    `?${Object.entries(queryParams)
        .map((param) => `${param[0]}=${param[1]}&`)
        .join('')}api_key=${API_KEY}`;

const createSortUrl = (sort: SortParams, queryParams: QueryParams): string => {
    const query = createQuery(queryParams);
    return `${API_URL}movie/${sort}${query}`;
};

const createSearchUrl = (search: Search, queryParams: QueryParams): string => {
    const query = createQuery(queryParams);
    return `${API_URL}${search}/movie${query}`;
};

export const getMovies = async (list: SortParams | Search, queryParams: QueryParams) => {
    const url = list === 'search' ? createSearchUrl(list, queryParams) : createSortUrl(list, queryParams);
    const res = await fetch(url);
    const data = await res.json();
    return data;
};
