enum FavoriteMovieColor {
    favorite = 'red',
    notFavorite = '#ff000078',
}

enum LocalStorage {
    favoriteMovies = 'favorite-movies',
}

const getDataFromLocalStorage = (item: string): string[] => {
    const data = localStorage.getItem(item);
    return data ? JSON.parse(data) : [];
};

const setDataToLocalStorage = (item: string, data: string[]): void => {
    localStorage.setItem(item, JSON.stringify(data));
};

export const isMovieFavorite = (movieId: string, favoriteMovies?: string[]): boolean => (favoriteMovies ?? getDataFromLocalStorage(LocalStorage.favoriteMovies)).includes(movieId);

export const fillingColor = (movieId: string): string => isMovieFavorite(movieId) ? FavoriteMovieColor.favorite : FavoriteMovieColor.notFavorite;

export const toggleFavoriteMovie = (movieId: string): string => {
    let favoriteMovies = getDataFromLocalStorage(LocalStorage.favoriteMovies);
    if (isMovieFavorite(movieId, favoriteMovies)) {
        favoriteMovies = favoriteMovies.filter((id) => id !== movieId);
    } else {
        favoriteMovies.push(movieId);
    }
    setDataToLocalStorage(LocalStorage.favoriteMovies, favoriteMovies);
    return fillingColor(movieId);
};
