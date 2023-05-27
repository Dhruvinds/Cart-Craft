import {
  CATEGORIES_LIST_FAIL,
  CATEGORIES_LIST_SUCCSESS,
  CATEGORIES_LIST_REQUEST,
  CATEGORIES_UPDATE_FAIL,
  CATEGORIES_UPDATE_REQUEST,
  CATEGORIES_UPDATE_RESET,
  CATEGORIES_UPDATE_SUCCSESS,
  CATEGORIES_ADD_FAIL,
  CATEGORIES_ADD_REQUEST,
  CATEGORIES_ADD_RESET,
  CATEGORIES_ADD_SUCCSESS,
  CATEGORIES_DELETE_FAIL,
  CATEGORIES_DELETE_REQUEST,
  CATEGORIES_DELETE_RESET,
  CATEGORIES_DELETE_SUCCSESS,
} from "../constants/categoryConstants";
import axios from "axios";

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORIES_LIST_REQUEST });
    const { data } = await axios.get(
      "http://localhost:5000/api/categories/allCategories"
    );
    dispatch({
      type: CATEGORIES_LIST_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCategory =
  (id, name, description) => async (dispatch, getState) => {
    const {
      userDetails: { user },
    } = getState();

    try {
      dispatch({
        type: CATEGORIES_UPDATE_REQUEST,
      });

      if (user.role.permissions[0].ctupdate) {
        const { data } = await axios.put(
          `http://localhost:5000/api/categories/${id}`,
          {
            name,
            description,
            userName: user.firstName,
            role: user.role.name,
          }
        );

        dispatch({
          type: CATEGORIES_UPDATE_SUCCSESS,
          payload: data,
        });

        setTimeout(() => {
          dispatch({ type: CATEGORIES_UPDATE_RESET });
        }, 3000);
      } else {
        dispatch({
          type: CATEGORIES_UPDATE_FAIL,
          payload: "You don't have permission",
        });
        setTimeout(() => {
          dispatch({ type: CATEGORIES_UPDATE_RESET });
        }, 3000);
      }
    } catch (error) {
      dispatch({
        type: CATEGORIES_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({ type: CATEGORIES_UPDATE_RESET });
      }, 3000);
    }
  };

export const createCategory =
  (name, description) => async (dispatch, getState) => {
    const {
      userDetails: { user },
    } = getState();

    try {
      dispatch({
        type: CATEGORIES_ADD_REQUEST,
      });

      if (user.role.permissions[0].ctadd) {
        const { data } = await axios.post(
          "http://localhost:5000/api/categories/addCategories",
          {
            name,
            description,
            userName: user.firstName,
            role: user.role.name,
          }
        );

        dispatch({
          type: CATEGORIES_ADD_SUCCSESS,
          payload: data,
        });

        setTimeout(() => {
          dispatch({ type: CATEGORIES_ADD_RESET });
        }, 3000);
      } else {
        dispatch({
          type: CATEGORIES_ADD_FAIL,
          payload: "You don't have permissions",
        });
        setTimeout(() => {
          dispatch({ type: CATEGORIES_ADD_RESET });
        }, 3000);
      }
    } catch (error) {
      dispatch({
        type: CATEGORIES_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({ type: CATEGORIES_ADD_RESET });
      }, 3000);
    }
  };

export const deleteCategory = (id) => async (dispatch, getState) => {
  const {
    userDetails: { user },
  } = getState();

  try {
    dispatch({
      type: CATEGORIES_DELETE_REQUEST,
    });

    if (user.role.permissions[0].ctdelete) {
      const { data } = await axios.delete(
        `http://localhost:5000/api/categories/${id}`
      );

      dispatch({
        type: CATEGORIES_DELETE_SUCCSESS,
        payload: data,
      });

      setTimeout(() => {
        dispatch({ type: CATEGORIES_DELETE_RESET });
      }, 2500);
    } else {
      dispatch({
        type: CATEGORIES_DELETE_FAIL,
        payload: "You don't have permission",
      });
      setTimeout(() => {
        dispatch({ type: CATEGORIES_DELETE_RESET });
      }, 2500);
    }
  } catch (error) {
    dispatch({
      type: CATEGORIES_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({ type: CATEGORIES_DELETE_RESET });
    }, 2500);
  }
};
