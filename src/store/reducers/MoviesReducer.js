import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';
const initialState = {
  favoriteMovies: []
}

const MoviesReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.UPDATE_MOVIES_DATA:
      console.log(action.payload)
      return {
        ...state,
        favoriteMovies: action.payload
      };
    case actionTypes.ADD_MOVIE_TO_FAVORITE:
      let tempMovieArr = state.favoriteMovies
      tempMovieArr.push(action.payload)
       axios.put(`https://isracardtest-c3c0f.firebaseio.com/FavoriteMovies/.json`, tempMovieArr)
      .catch((err) => console.log(err));
      return {
        ...state,
        favoriteMovies: tempMovieArr
      };
    case actionTypes.REMOVE_MOVIE_TO_FAVORITE:

      let tempMovieArr2 = state.favoriteMovies
      const filerFavoriteMoviesArr = tempMovieArr2.filter(movie => movie.item.id  !== action.payload);
      axios.put(`https://isracardtest-c3c0f.firebaseio.com/FavoriteMovies/.json`, filerFavoriteMoviesArr)
      .then(() => {
      })
      .catch((err) => console.log(err));
      return {
        ...state,
        favoriteMovies: filerFavoriteMoviesArr
      };
    default: return state;
  }
}

export default MoviesReducer;