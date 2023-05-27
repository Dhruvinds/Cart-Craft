import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//import reducers
import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsreducer,
  userProfileUpdateReducer,
  userPasswordChangeReducer,
} from "./Redusers/userReducer";

import {
  categoriesListReducer,
  CategoryUpdateReducer,
  categoryCreateReducer,
  categoryDeleteReducer,
} from "./Redusers/categoriesReducers";

import {
  subcategoriesListReducer,
  subcategoryCreateReducer,
  subcategoryDeleteReducer,
  subCategoryUpdateReducer,
} from "./Redusers/subcategoriesReducers";

import {
  manufacturerListReducer,
  manufacturerAddReducer,
  manufacturerDeleteReducer,
  manufacturerUpdateReducer,
} from "./Redusers/manufacturerReducer";

import {
  productCreateReducer,
  productsListReducer,
  productDeleteReducer,
  productUpdateReducer,
  productDetailsReducer,
} from "./Redusers/productsReducers";

import {
  orderCreateReducer,
  orderListMyReducer,
  orderDetailsReducer,
} from "./Redusers/orderReducers";

import {
  AllorderReducer,
  orderUpdateReducer,
} from "./Redusers/allorderReducers";

import { cartReducer } from "./Redusers/addtocartReducers";
import { wishlistReducer } from "./Redusers/wishlistReducers";
import { usersListReducer } from "./Redusers/userlistReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const userInfoFromStorageres = localStorage.getItem("userInfores")
  ? JSON.parse(localStorage.getItem("userInfores"))
  : null;
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const wishlistItemsFromStorage = localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : [];
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsreducer,
  userProfileUpdate: userProfileUpdateReducer,
  userPasswordChange: userPasswordChangeReducer,
  categoriesList: categoriesListReducer,
  categoryUpdate: CategoryUpdateReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  subCategoriesList: subcategoriesListReducer,
  subCategoryCreate: subcategoryCreateReducer,
  subCategoryDelete: subcategoryDeleteReducer,
  subCategoryUpdate: subCategoryUpdateReducer,
  manufacturerList: manufacturerListReducer,
  manufacturerAdd: manufacturerAddReducer,
  manufacturerDelete: manufacturerDeleteReducer,
  manufacturerUpdate: manufacturerUpdateReducer,
  productCreate: productCreateReducer,
  productList: productsListReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  usersList: usersListReducer,
  orderCreate: orderCreateReducer,
  orderListMy: orderListMyReducer,
  orderDetails: orderDetailsReducer,
  allorderList: AllorderReducer,
  orderUpdate: orderUpdateReducer,
});

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  wishlist: {
    wishlistItems: wishlistItemsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  userRegister: { userInfores: userInfoFromStorageres },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
