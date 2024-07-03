export const API_KEY = '774a8b8ec5bdfb82ea4602f9b712a546';
export const API_URL = 'https://api.themoviedb.org/3/';
export const IMG_URL = 'https://image.tmdb.org/t/p/original/';

export enum Tags {
    div = 'div',
    img = 'img',
}

export interface ResponseResults {
    id: number;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface ResponseMovies {
    page: number;
    total_pages: number;
    results: ResponseResults[];
    total_results: number;
}
