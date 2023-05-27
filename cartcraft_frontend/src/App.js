import React from "react";

import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ResetPassword from "./pages/Resetpassword";
import EditProfile from "./pages/EditProfile";
import Changepassword from "./pages/ChangePassword";
import UserProfile from "./pages/Profile";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Manufacturer from "./pages/Manufacturer";
import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import AllOrder from "./pages/AllOrder";
import Dashboard from "./pages/Dashboard";
import EditProduct from "./pages/Editproduct";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import ManagePermission from "./pages/ManagePermission";
import ProductScreen from "./pages/Productscreen";
import CartScreen from "./pages/CartScreen";
import WishListScreen from "./pages/WishListScreen";
import Shipping from "./pages/Shipping";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrder from "./pages/PlaceOrder";
import Myorder from "./pages/Myorder";
import OurTeam from "./pages/OurTeam";
import OrderDetails from "./pages/OrderDetails";
import OrderDetailsAdmin from "./pages/OrderDetailsAdmin";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="resetpassword/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/managepermission" element={<ManagePermission />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/SubCategory" element={<SubCategory />} />
          <Route path="/addproduct" element={<ProductAdd />} />
          <Route path="/Manufacturer" element={<Manufacturer />} />
          <Route path="/cart/:id/:qty" element={<CartScreen />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/changepassword" element={<Changepassword />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/products/:id" element={<ProductScreen />} />
          <Route path="/wishlist/:id" element={<WishListScreen />} />
          <Route path="/wishlist" element={<WishListScreen />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/myorder" element={<Myorder />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/orderadmin/:id" element={<OrderDetailsAdmin />} />
          <Route path="/allOrder" element={<AllOrder />} />
          <Route path="/ourteam" element={<OurTeam />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
