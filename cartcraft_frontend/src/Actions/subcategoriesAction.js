import {
  SUBCATEGORIES_LIST_FAIL,
  SUBCATEGORIES_LIST_SUCCSESS,
  SUBCATEGORIES_LIST_REQUEST,
  SUBCATEGORIES_ADD_REQUEST,
  SUBCATEGORIES_ADD_SUCCSESS,
  SUBCATEGORIES_ADD_FAIL,
  SUBCATEGORIES_ADD_RESET,
  SUBCATEGORIES_UPDATE_REQUEST,
  SUBCATEGORIES_UPDATE_SUCCSESS,
  SUBCATEGORIES_UPDATE_FAIL,
  SUBCATEGORIES_UPDATE_RESET,
  SUBCATEGORIES_DELETE_REQUEST,
  SUBCATEGORIES_DELETE_SUCCSESS,
  SUBCATEGORIES_DELETE_FAIL,
  SUBCATEGORIES_DELETE_RESET,
} from "../constants/subcategoryConstants";
import axios from "axios";

// ADD SUB CATEGORY

export const addSubcategory =
  (category, name, description) => async (dispatch, getState) => {
    const {
      userDetails: { user },
    } = getState();

    try {
      dispatch({ type: SUBCATEGORIES_ADD_REQUEST });
      if (user.role.permissions[0].sbctadd) {
        const { data } = await axios.post(
          "http://localhost:5000/api/subcategories/add",
          {
            category,
            name,
            description,
            userName: user.firstName,
            role: user.role.name,
          }
        );
        dispatch({
          type: SUBCATEGORIES_ADD_SUCCSESS,
          payload: data,
        });

        setTimeout(() => {
          dispatch({ type: SUBCATEGORIES_ADD_RESET });
        }, 2500);
      } else {
        dispatch({
          type: SUBCATEGORIES_ADD_FAIL,
          payload: "You don't have permission",
        });
        setTimeout(() => {
          dispatch({ type: SUBCATEGORIES_ADD_RESET });
        }, 2500);
      }
    } catch (error) {
      dispatch({
        type: SUBCATEGORIES_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({ type: SUBCATEGORIES_ADD_RESET });
      }, 2500);
    }
  };

export const listSubCategories = () => async (dispatch) => {
  try {
    dispatch({ type: SUBCATEGORIES_LIST_REQUEST });
    const { data } = await axios.get(
      "http://localhost:5000/api/subcategories/all"
    );
    dispatch({
      type: SUBCATEGORIES_LIST_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORIES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubCategory = (id) => async (dispatch, getState) => {
  const {
    userDetails: { user },
  } = getState();

  try {
    dispatch({
      type: SUBCATEGORIES_DELETE_REQUEST,
    });

    if (user.role.permissions[0].sbctdelete) {
      const { data } = await axios.delete(
        `http://localhost:5000/api/subcategories/delete/${id}`
      );

      dispatch({
        type: SUBCATEGORIES_DELETE_SUCCSESS,
        payload: data,
      });

      setTimeout(() => {
        dispatch({ type: SUBCATEGORIES_DELETE_RESET });
      }, 2500);
    } else {
      dispatch({
        type: SUBCATEGORIES_ADD_FAIL,
        payload: "You don't have permission",
      });
      setTimeout(() => {
        dispatch({ type: SUBCATEGORIES_ADD_RESET });
      }, 2500);
    }
  } catch (error) {
    dispatch({
      type: SUBCATEGORIES_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({ type: SUBCATEGORIES_DELETE_RESET });
    }, 2500);
  }
};

// update subcategory
export const updateSubategory =
  (id, name, description) => async (dispatch, getState) => {
    const {
      userDetails: { user },
    } = getState();

    try {
      dispatch({
        type: SUBCATEGORIES_UPDATE_REQUEST,
      });

      if (user.role.permissions[0].sbctupdate) {
        const { data } = await axios.put(
          `http://localhost:5000/api/subcategories/${id}`,
          {
            name,
            description,
            userName: user.firstName,
            role: user.role.name,
          }
        );

        dispatch({
          type: SUBCATEGORIES_UPDATE_SUCCSESS,
          payload: data,
        });

        setTimeout(() => {
          dispatch({ type: SUBCATEGORIES_UPDATE_RESET });
        }, 3000);
      } else {
        dispatch({
          type: SUBCATEGORIES_UPDATE_FAIL,
          payload: "You don't have permission",
        });
        setTimeout(() => {
          dispatch({ type: SUBCATEGORIES_UPDATE_RESET });
        }, 3000);
      }
    } catch (error) {
      dispatch({
        type: SUBCATEGORIES_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({ type: SUBCATEGORIES_UPDATE_RESET });
      }, 3000);
    }
  };
