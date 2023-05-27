import React, { useState, useEffect } from "react";
import { Form, Button, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../Actions/addtocartActions";
import CheckoutStep from "../components/CheckoutStep";
import Navbar from "./UserDashboard";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <CheckoutStep step1 step2 step3 />

      <div className="d-flex justify-content-center ">
        <div
          className="card"
          style={{ width: "25rem", height: "17rem", marginTop: "5%" }}
        >
          <div className="card-body">
            <h3 className="card-title text-center">Payment Method:-</h3>
            <h5 className="card-text mt-4">Select Payment Method :-</h5>
            <div className="form-check mt-3">
              <input
                className="form-check-input "
                type="radio"
                id="paypal"
                value="paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Paypal or Credit Card
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                disabled
              />
              <label className="form-check-label" for="flexRadioDefault2">
                UPI
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                disabled
              />
              <label className="form-check-label" for="flexRadioDefault2">
                Paytm
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                disabled
              />
              <label className="form-check-label" for="flexRadioDefault2">
                Debit card or Credit card
              </label>
            </div>
          </div>
          <button className="btn btn-sm  btn-primary" onClick={submitHandler}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
