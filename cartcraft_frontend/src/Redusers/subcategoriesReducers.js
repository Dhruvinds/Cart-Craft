import {
  SUBCATEGORIES_LIST_FAIL,
  SUBCATEGORIES_LIST_SUCCSESS,
  SUBCATEGORIES_LIST_REQUEST,
  SUBCATEGORIES_UPDATE_FAIL,
  SUBCATEGORIES_UPDATE_REQUEST,
  SUBCATEGORIES_UPDATE_RESET,
  SUBCATEGORIES_UPDATE_SUCCSESS,
  SUBCATEGORIES_ADD_FAIL,
  SUBCATEGORIES_ADD_REQUEST,
  SUBCATEGORIES_ADD_RESET,
  SUBCATEGORIES_ADD_SUCCSESS,
  SUBCATEGORIES_DELETE_FAIL,
  SUBCATEGORIES_DELETE_REQUEST,
  SUBCATEGORIES_DELETE_RESET,
  SUBCATEGORIES_DELETE_SUCCSESS,
} from "../constants/subcategoryConstants";

export const subcategoriesListReducer = (
  state = { subcategory: [] },
  action
) => {
  switch (action.type) {
    case SUBCATEGORIES_LIST_REQUEST:
      return { loading: true, subcategory: [] };
    case SUBCATEGORIES_LIST_SUCCSESS:
      return { loading: false, subcategory: action.payload };
    case SUBCATEGORIES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subCategoryUpdateReducer = (
  state = { subcategory: {} },
  action
) => {
  switch (action.type) {
    case SUBCATEGORIES_UPDATE_REQUEST:
      return { loading: true };
    case SUBCATEGORIES_UPDATE_SUCCSESS:
      return { loading: false, success: true, subcategory: action.payload };
    case SUBCATEGORIES_UPDATE_FAIL:
      return { loading: false, error: action.payload, updaterror: true };
    case SUBCATEGORIES_UPDATE_RESET:
      return { category: {} };
    default:
      return state;
  }
};

export const subcategoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORIES_ADD_REQUEST:
      return { loading: true };
    case SUBCATEGORIES_ADD_SUCCSESS:
      return { loading: false, succ: true };
    case SUBCATEGORIES_ADD_FAIL:
      return { loading: false, err: action.payload, createrror: true };
    case SUBCATEGORIES_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const subcategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORIES_DELETE_REQUEST:
      return { loading: true };
    case SUBCATEGORIES_DELETE_SUCCSESS:
      return { loading: false, delsucc: true };
    case SUBCATEGORIES_DELETE_FAIL:
      return { loading: false, delerr: action.payload, deleteerror: true };
    case SUBCATEGORIES_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
