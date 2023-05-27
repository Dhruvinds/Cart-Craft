import {
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCSESS,
  USERS_LIST_FAIL,
} from "../constants/userlistConstants";

export const usersListReducer = (state = { userslist: [] }, action) => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      return { loading: true, userslist: [] };
    case USERS_LIST_SUCCSESS:
      return { loading: false, userslist: action.payload };
    case USERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
