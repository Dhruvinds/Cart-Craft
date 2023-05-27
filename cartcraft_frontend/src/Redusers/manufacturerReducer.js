import {
  MANUFACTURER_LIST_REQUEST,
  MANUFACTURER_LIST_SUCCSESS,
  MANUFACTURER_LIST_FAIL,
  MANUFACTURER_ADD_REQUEST,
  MANUFACTURER_ADD_SUCCSESS,
  MANUFACTURER_ADD_FAIL,
  MANUFACTURER_ADD_RESET,
  MANUFACTURER_DELETE_REQUEST,
  MANUFACTURER_DELETE_SUCCSESS,
  MANUFACTURER_DELETE_FAIL,
  MANUFACTURER_DELETE_RESET,
  MANUFACTURER_UPDATE_REQUEST,
  MANUFACTURER_UPDATE_SUCCSESS,
  MANUFACTURER_UPDATE_FAIL,
  MANUFACTURER_UPDATE_RESET,
} from "../constants/manufacturerConstant";

export const manufacturerListReducer = (
  state = { manufacturers: [] },
  action
) => {
  switch (action.type) {
    case MANUFACTURER_LIST_REQUEST:
      return { loading: true, manufacturers: [] };
    case MANUFACTURER_LIST_SUCCSESS:
      return { loading: false, manufacturers: action.payload };
    case MANUFACTURER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//Add manufacturer reducer
export const manufacturerAddReducer = (state = {}, action) => {
  switch (action.type) {
    case MANUFACTURER_ADD_REQUEST:
      return { loading: true };
    case MANUFACTURER_ADD_SUCCSESS:
      return { loading: false, success: true, manufacturer: action.payload };
    case MANUFACTURER_ADD_FAIL:
      return { loading: false, error: action.payload, createerror: true };
    case MANUFACTURER_ADD_RESET:
      return {};
    default:
      return state;
  }
};

//delete manufacturer reducer
export const manufacturerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MANUFACTURER_DELETE_REQUEST:
      return { loading: true };
    case MANUFACTURER_DELETE_SUCCSESS:
      return { loading: false, delsucc: true };
    case MANUFACTURER_DELETE_FAIL:
      return { loading: false, delerr: action.payload, deleteerror: true };
    case MANUFACTURER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

//Update manufacturer reducer

export const manufacturerUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case MANUFACTURER_UPDATE_REQUEST:
        return { loading: true };
      case MANUFACTURER_UPDATE_SUCCSESS:
        return { loading: false, updsucc: true };
      case MANUFACTURER_UPDATE_FAIL:
        return { loading: false, upderr: action.payload, updateerror: true };
      case MANUFACTURER_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };