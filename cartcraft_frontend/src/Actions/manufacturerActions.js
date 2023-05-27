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
import axios from "axios";

export const listManufacturers = () => async (dispatch) => {
  try {
    dispatch({ type: MANUFACTURER_LIST_REQUEST });
    const { data } = await axios.get(
      "http://localhost:5000/api/manufacturers/all"
    );
    dispatch({
      type: MANUFACTURER_LIST_SUCCSESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MANUFACTURER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addManufacturer =
  (name, email, location, phone, description) => async (dispatch, getState) => {
    const {
      userDetails: { user },
    } = getState();
    try {
      dispatch({ type: MANUFACTURER_ADD_REQUEST });
      if (user.role.permissions[0].mfradd) {
        const { data } = await axios.post(
          "http://localhost:5000/api/manufacturers/add",
          {
            name,
            email,
            location,
            phone,
            description,
            userName: user.firstName,
            role: user.role.name,
          }
        );
        dispatch({
          type: MANUFACTURER_ADD_SUCCSESS,
          payload: data,
        });

        setTimeout(() => {
          dispatch({ type: MANUFACTURER_ADD_RESET });
        }, 2500);
      } else {
        dispatch({
          type: MANUFACTURER_ADD_FAIL,
          payload: "you don't have permission",
        });
        setTimeout(() => {
          dispatch({ type: MANUFACTURER_ADD_RESET });
        }, 2500);
      }
    } catch (error) {
      dispatch({
        type: MANUFACTURER_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({ type: MANUFACTURER_ADD_RESET });
      }, 2500);
    }
  };

export const deleteManufacturer = (id) => async (dispatch, getState) => {
  const {
    userDetails: { user },
  } = getState();

  try {
    dispatch({
      type: MANUFACTURER_DELETE_REQUEST,
    });

    if (user.role.permissions[0].mfrdelete) {
      const { data } = await axios.delete(
        `http://localhost:5000/api/manufacturers/${id}`
      );

      dispatch({
        type: MANUFACTURER_DELETE_SUCCSESS,
        payload: data,
      });

      setTimeout(() => {
        dispatch({ type: MANUFACTURER_DELETE_RESET });
      }, 2500);
    } else {
      dispatch({
        type: MANUFACTURER_DELETE_FAIL,
        payload: "You don't have permission",
      });

      setTimeout(() => {
        dispatch({ type: MANUFACTURER_DELETE_RESET });
      }, 2500);
    }
  } catch (error) {
    dispatch({
      type: MANUFACTURER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    setTimeout(() => {
      dispatch({ type: MANUFACTURER_DELETE_RESET });
    }, 2500);
  }
};

export const updateManufacturer =
  (id, name, location, phone, description) => async (dispatch, getState) => {
    const {
      userDetails: { user },
    } = getState();

    try {
      dispatch({ type: MANUFACTURER_UPDATE_REQUEST });

      if (user.role.permissions[0].mfrupdate) {
        const { data } = await axios.put(
          `http://localhost:5000/api/manufacturers/${id} `,
          {
            name,
            location,
            phone,
            description,
            userName: user.firstName,
            role: user.role.name,
          }
        );
        dispatch({
          type: MANUFACTURER_UPDATE_SUCCSESS,
          payload: data,
        });

        setTimeout(() => {
          dispatch({ type: MANUFACTURER_UPDATE_RESET });
        }, 2500);
      } else {
        dispatch({
          type: MANUFACTURER_UPDATE_FAIL,
          payload: "You don't have permission",
        });
        setTimeout(() => {
          dispatch({ type: MANUFACTURER_UPDATE_RESET });
        }, 2500);
      }
    } catch (error) {
      dispatch({
        type: MANUFACTURER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({ type: MANUFACTURER_UPDATE_RESET });
      }, 2500);
    }
  };
