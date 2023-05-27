import {
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCSESS,
  USERS_LIST_FAIL,
  USERS_ROLE_UPDATE_REQUEST,
  USERS_ROLE_UPDATE_SUCCSESS,
  USERS_ROLE_UPDATE_FAIL,
} from "../constants/userlistConstants";

import { USER_DETAILS_RESET } from "../constants/userConstants";

import axios from "axios";

export const alluserslist = () => async (dispatch) => {
  try {
    dispatch({ type: USERS_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:5000/api/users/all");
    dispatch({
      type: USERS_LIST_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updaterole = (id, role) => async (dispatch) => {
  try {
    dispatch({ type: USERS_ROLE_UPDATE_REQUEST });
    const { data } = await axios.put(`http://localhost:5000/api/users/${id}`, {
      role,
    });
    dispatch({
      type: USERS_ROLE_UPDATE_SUCCSESS,
      payload: data,
    });
    dispatch({ type: USER_DETAILS_RESET });
  } catch (error) {
    dispatch({
      type: USERS_ROLE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
