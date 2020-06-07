import * as actionTypes from './actionTypes';

export const addMovieToFavorite = (movie) => {
  return {
    type: actionTypes.ADD_MOVIE_TO_FAVORITE,
    payload: movie
  };
};

export const removeMovieToFavorite = (movieID) => {
  return {
    type: actionTypes.REMOVE_MOVIE_TO_FAVORITE,
    payload: movieID
  };
};

export const updateMoviesData = (data) => {
  return {
    type: actionTypes.UPDATE_MOVIES_DATA,
    payload: data
    
  };
};