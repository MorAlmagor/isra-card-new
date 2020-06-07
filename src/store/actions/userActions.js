import * as actionTypes from './actionTypes';

export const addUserDetails = (details) => {
  return {
    type: actionTypes.ADD_USER_DETAIL,
    payload: details
  };
};

export const removeUserDetail = () => {
  return {
    type: actionTypes.REMOVE_USER_DETAIL
  };
};