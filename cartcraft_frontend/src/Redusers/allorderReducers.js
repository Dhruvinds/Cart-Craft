import {
  ORDERS_LIST_FAIL,
  ORDERS_LIST_SUCCSESS,
  ORDERS_LIST_REQUEST,
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_SUCCSESS,
  ORDER_STATUS_FAIL,
  ORDER_STATUS_RESET,
} from "../constants/allorderConstants";

export const AllorderReducer = (state = { allorders: [] }, action) => {
  switch (action.type) {
    case ORDERS_LIST_REQUEST:
      return { loading: true, allorders: [] };
    case ORDERS_LIST_SUCCSESS:
      return { loading: false, allorders: action.payload };
    case ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderUpdateReducer = (state = { orderupdate: {} }, action) => {
  switch (action.type) {
    case ORDER_STATUS_REQUEST:
      return { loading: true };
    case ORDER_STATUS_SUCCSESS:
      return { loading: false, success: true, orderupdate: action.payload };
    case ORDER_STATUS_FAIL:
      return { loading: false, error: action.payload, updaterror: true };
    case ORDER_STATUS_RESET:
      return { orderupdate: {} };
    default:
      return state;
  }
};
