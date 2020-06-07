import * as actionTypes from '../actions/actionTypes';

const initialState = {
  favoriteMovies: []
}

const MoviesReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_MOVIE_TO_FAVORITE:
      let tempMovieArr = state.favoriteMovies
      tempMovieArr.push(action.payload)
      return {
        ...state,
        favoriteMovies: tempMovieArr
      };
    case actionTypes.REMOVE_MOVIE_TO_FAVORITE:
      let tempMovieArr2 = state.favoriteMovies
      const filerFavoriteMoviesArr = tempMovieArr2.filter(movie => movie.item.id  !== action.payload);
      return {
        ...state,
        favoriteMovies: filerFavoriteMoviesArr
      };
    default: return state;
  }
}

export default MoviesReducer;