import React, { useEffect, useState } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../components/CheckoutStep";
import Navbar from "./UserDashboard";
import Message from "../components/Message";
import { createOrder } from "../Actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "../components/Loader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const PlaceOrder = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const cart = useSelector((state) => state.cart);

  const neworder = useSelector((state) => state.orderCreate);
  const { order, success } = neworder;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //fun for decimal
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.prize * item.qty, 0)
  );
  cart.shippingPrice = addDecimal(cart.itemsPrice > 500 ? 0 : 25);
  cart.taxPrice = addDecimal(Number((0.05 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        "http://localhost:5000/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, [dispatch, order, navigate]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        paymentResult,
      })
    );
    if (paymentResult.status === "COMPLETED") {
      toast.success("your order has been placed succsessfully");
      setTimeout(() => {
        navigate("/myorder");
      }, 2000);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder="false" />
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping:-</h2>
              <p>
                <strong>Address :</strong>
                {cart.shippingAddress.address}&nbsp;
                {cart.shippingAddress.city}&nbsp;
                {cart.shippingAddress.postalcode}&nbsp;
                {cart.shippingAddress.country}&nbsp;
                {cart.shippingAddress.Phone}&nbsp;
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method:-</h2>
              <p>
                <strong>{cart.paymentMethod}</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items:-</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1} className="h-auto">
                          <Image
                            src={item.image[0]}
                            alt={item.name}
                            style={{ height: "50px", width: "auto" }}
                          />
                        </Col>
                        <Col className="h-auto">
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} className="h-auto">
                          ${item.prize} X {item.qty} = ${item.prize * item.qty}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!sdkReady ? (
                <Loader />
              ) : (
                <PayPalButton
                  amount={cart.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
