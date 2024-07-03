import { API_KEY, API_URL, ResponseMovies } from './config';

export type Search = 'search';
export type SortParams = 'popular' | 'top_rated' | 'upcoming';
export type QueryParams = { page?: number; query?: string };

const createQuery = (queryParams: QueryParams): string =>
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

export const getMovies = async (list: SortParams | Search, queryParams: QueryParams): Promise<ResponseMovies> => {
    const url = list === 'search' ? createSearchUrl(list, queryParams) : createSortUrl(list, queryParams);
    const res = await fetch(url);
    const data: ResponseMovies = await res.json();
    return data;
};
