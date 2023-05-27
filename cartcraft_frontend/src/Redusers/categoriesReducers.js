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

export const categoriesListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORIES_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORIES_LIST_SUCCSESS:
      return { loading: false, categories: action.payload };
    case CATEGORIES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const CategoryUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORIES_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORIES_UPDATE_SUCCSESS:
      return { loading: false, success: true, category: action.payload };
    case CATEGORIES_UPDATE_FAIL:
      return { loading: false, error: action.payload, updaterror: true };
    case CATEGORIES_UPDATE_RESET:
      return { category: {} };
    default:
      return state;
  }
};

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIES_ADD_REQUEST:
      return { loading: true };
    case CATEGORIES_ADD_SUCCSESS:
      return { loading: false, succ: true };
    case CATEGORIES_ADD_FAIL:
      return { loading: false, err: action.payload, createrror: true };
    case CATEGORIES_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIES_DELETE_REQUEST:
      return { loading: true };
    case CATEGORIES_DELETE_SUCCSESS:
      return { loading: false, delsucc: true };
    case CATEGORIES_DELETE_FAIL:
      return { loading: false, delerr: action.payload, deleteerror: true };
    case CATEGORIES_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
