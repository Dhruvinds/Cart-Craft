import {
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_SUCCSESS,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_ADD_REQUEST,
  PRODUCTS_ADD_SUCCSESS,
  PRODUCTS_ADD_FAIL,
  PRODUCTS_ADD_RESET,
  PRODUCTS_UPDATE_REQUEST,
  PRODUCTS_UPDATE_SUCCSESS,
  PRODUCTS_UPDATE_FAIL,
  PRODUCTS_UPDATE_RESET,
  PRODUCTS_DELETE_REQUEST,
  PRODUCTS_DELETE_SUCCSESS,
  PRODUCTS_DELETE_FAIL,
  PRODUCTS_DELETE_RESET,
  PRODUCT_DETAILS_FAILS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_RESET,
} from "../constants/productConstants";
import axios from "axios";

// ADD PRODUCT
export const addProduct =
  (
    category,
    subcategory,
    manufacture,
    productname,
    description,
    model,
    upc,
    location,
    prize,
    qty,
    status,
    image
  ) =>
  async (dispatch, getState) => {
    const {
      userDetails: { user },
    } = getState();
    try {
      dispatch({ type: PRODUCTS_ADD_REQUEST });
      if (user.role.permissions[0].prdctdelete) {
        const { data } = await axios.post(
          "http://localhost:5000/api/products/add",
          {
            category,
            subcategory,
            manufacture,
            productname,
            description,
            model,
            upc,
            location,
            prize,
            qty,
            status,
            image,
            userName: user.firstName,
            role: user.role.name,
          }
        );
        dispatch({
          type: PRODUCTS_ADD_SUCCSESS,
          payload: data,
        });
      } else {
        dispatch({
          type: PRODUCTS_ADD_FAIL,
          payload: "You Don't have permission",
        });
      }
    } catch (error) {
      dispatch({
        type: PRODUCTS_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const productdtlis = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listproducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:5000/api/products/all");
    dispatch({
      type: PRODUCTS_LIST_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  const {
    userDetails: { user },
  } = getState();
  try {
    dispatch({
      type: PRODUCTS_DELETE_REQUEST,
    });
    if (user.role.permissions[0].prdctdelete) {
      const { data } = await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      dispatch({
        type: PRODUCTS_DELETE_SUCCSESS,
        payload: data,
      });

      setTimeout(() => {
        dispatch({ type: PRODUCTS_DELETE_RESET });
      }, 2500);
    } else {
      dispatch({
        type: PRODUCTS_DELETE_FAIL,
        payload: "You don't have permission",
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCTS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    setTimeout(() => {
      dispatch({ type: PRODUCTS_DELETE_RESET });
    }, 2500);
  }
};

// UPDATE PRODUCT
export const updateProduct =
  (
    id,
    productname,
    description,
    model,
    upc,
    location,
    prize,
    qty,
    status,
    image
  ) =>
  async (dispatch, getState) => {
    const {
      userDetails: { user },
    } = getState();
    try {
      dispatch({ type: PRODUCTS_UPDATE_REQUEST });

      if (user.role.permissions[0].prdctupdate) {
        const { data } = await axios.put(
          `http://localhost:5000/api/products/${id}`,
          {
            productname,
            description,
            model,
            upc,
            location,
            qty,
            prize,
            status,
            image,
            userName: user.firstName,
            role: user.role.name,
          }
        );
        dispatch({
          type: PRODUCTS_UPDATE_SUCCSESS,
          payload: data,
        });

        dispatch({ type: PRODUCT_DETAILS_RESET });

        setTimeout(() => {
          dispatch({ type: PRODUCTS_UPDATE_RESET });
        }, 2500);
      } else {
        dispatch({
          type: PRODUCTS_UPDATE_FAIL,
          payload: "You don't have permission",
        });
        setTimeout(() => {
          dispatch({ type: PRODUCTS_UPDATE_RESET });
        }, 2500);
      }
    } catch (error) {
      dispatch({
        type: PRODUCTS_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({ type: PRODUCTS_UPDATE_RESET });
      }, 2500);
    }
  };
