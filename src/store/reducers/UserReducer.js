import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userName: false,
  photoURL: false,
}

const UserReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_USER_DETAIL:
      return {
        ...state,
        userName: action.payload.userName,
        photoURL: action.payload.photoURL,
      };
    case actionTypes.REMOVE_USER_DETAIL:
      return {
        ...state,
        userName: false,
        photoURL: false,
      };
    default: return state;
  }
}

export default UserReducer;