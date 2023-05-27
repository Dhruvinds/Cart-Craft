import {
  ORDERS_LIST_FAIL,
  ORDERS_LIST_SUCCSESS,
  ORDERS_LIST_REQUEST,
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_SUCCSESS,
  ORDER_STATUS_FAIL,
  ORDER_STATUS_RESET,
} from "../constants/allorderConstants";
import axios from "axios";

export const listallOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDERS_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:5000/api/orders/");
    dispatch({
      type: ORDERS_LIST_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrderstatus = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_STATUS_REQUEST,
    });
    const { data } = await axios.put(`http://localhost:5000/api/orders/${id}`, {
      status,
    });

    dispatch({
      type: ORDER_STATUS_SUCCSESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: ORDER_STATUS_RESET,
      });
    }, 3000);
  } catch (error) {
    dispatch({
      type: ORDER_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
