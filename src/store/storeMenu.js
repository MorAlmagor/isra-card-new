import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import MoviesReducer from '../store/reducers/MoviesReducer'
import UserReducer from '../store/reducers/UserReducer'

const rootReducer = combineReducers({
  movie: MoviesReducer,
  user: UserReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };