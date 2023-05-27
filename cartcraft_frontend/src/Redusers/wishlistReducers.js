import {
    ADD_ITEM_WISHLIST,
    REMOVE_ITEM_WISHLIST,
    RESET_ITEM_WISHLIST,
  } from "../constants/wishlistConstants";
  
  export const wishlistReducer = (state = { wishlistItems: []}, action) => {
    switch (action.type) {
      case ADD_ITEM_WISHLIST:
        const item = action.payload;
      const existItem = state.wishlistItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, item],
        };
      }
    case REMOVE_ITEM_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter((x) => x.product !== action.payload),
      };
    case RESET_ITEM_WISHLIST:
      return {};

    default:
      return state;
  }
};
  