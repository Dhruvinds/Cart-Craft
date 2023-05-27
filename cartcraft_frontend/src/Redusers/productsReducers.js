import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCSESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_UPDATE_FAIL,
  PRODUCTS_UPDATE_REQUEST,
  PRODUCTS_UPDATE_RESET,
  PRODUCTS_UPDATE_SUCCSESS,
  PRODUCTS_ADD_FAIL,
  PRODUCTS_ADD_REQUEST,
  PRODUCTS_ADD_RESET,
  PRODUCTS_ADD_SUCCSESS,
  PRODUCTS_DELETE_FAIL,
  PRODUCTS_DELETE_REQUEST,
  PRODUCTS_DELETE_RESET,
  PRODUCTS_DELETE_SUCCSESS,
  PRODUCT_DETAILS_FAILS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_RESET,
} from "../constants/productConstants";

export const productsListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCTS_LIST_SUCCSESS:
      return { loading: false, products: action.payload };
    case PRODUCTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCTS_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCTS_UPDATE_SUCCSESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCTS_UPDATE_FAIL:
      return { loading: false, error: action.payload, updaterror: true };
    case PRODUCTS_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_ADD_REQUEST:
      return { loading: true };
    case PRODUCTS_ADD_SUCCSESS:
      return { loading: false, succ: true };
    case PRODUCTS_ADD_FAIL:
      return { loading: false, err: action.payload, createrror: true };
    case PRODUCTS_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_DELETE_REQUEST:
      return { loading: true };
    case PRODUCTS_DELETE_SUCCSESS:
      return { loading: false, delsucc: true };
    case PRODUCTS_DELETE_FAIL:
      return { loading: false, delerr: action.payload, deleteerror: true };
    case PRODUCTS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAILS:
      return { loading: false, error: action.payload };
    case PRODUCT_DETAILS_RESET:
      return { product: {} };
    default:
      return state;
  }
};
