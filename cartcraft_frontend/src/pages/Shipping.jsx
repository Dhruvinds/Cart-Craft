import React, { useState } from "react";
import CheckoutStep from "../components/CheckoutStep";
import Navbar from "./UserDashboard";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FromContainer from "../components/FromContainer";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../Actions/addtocartActions";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [address, setAddress] = useState(shippingAddress.address);
  const [landmark, setlandmark] = useState(shippingAddress.landmark);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalcode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [Phone, setPhone] = useState(shippingAddress.Phone);

  const submitHandler = (e) => {
    e.preventDefault();
    if (Phone.length !== 10) {
      alert("please enter valid number");
    } else {
      //dispatch
      dispatch(
        saveShippingAddress({
          address,
          landmark,
          city,
          postalCode,
          Phone,
          country,
        })
      );
      if (userInfo) {
        navigate("/payment");
      } else {
        alert("you need to login before payment");
        navigate("/login");
      }
    }
  };
  return (
    <>
      <Navbar />
      <CheckoutStep step1 step2 />
      <FromContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address:-</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="landmark">
            <Form.Label>Landmark:-</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter landmark"
              value={landmark}
              onChange={(e) => setlandmark(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City:-</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalcode">
            <Form.Label>PostalCode:-</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter postalcode"
              value={postalCode}
              onChange={(e) => setPostalcode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalcode">
            <Form.Label>Phone Number:-</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your Phone Number"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country:-</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            continue
          </Button>
        </Form>
      </FromContainer>
    </>
  );
};

export default Shipping;
