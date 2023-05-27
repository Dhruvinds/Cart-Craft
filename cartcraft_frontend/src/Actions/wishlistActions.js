import axios from "axios";
import {
  ADD_ITEM_WISHLIST,
  REMOVE_ITEM_WISHLIST,
} from "../constants/wishlistConstants";

export const addToWishlist = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
  dispatch({
    type: ADD_ITEM_WISHLIST,
    payload: {
      product: data._id,
      name: data.productname,
      category: data.category,
      description: data.description,
      image: data.image,
      prize: data.prize,
    },
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
  // localStorage.setItem('whishlist items',JSON.stringify(data));
};

export const removeFromWishlist = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_WISHLIST,
    payload: id,
  });
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlist.wishlistItems)
  );
};
