import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "./UserDashboard";
import Orderconfirmmodel from "./Orderconfirmmodel";

import { addToCart, removeFromCart } from "../Actions/addtocartActions";

const CartScreen = () => {
  const { id, qty } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setopen] = useState(false);
  const [message, setmessage] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkout = () => {
    navigate("/shipping");
  };

  return (
    <>
      <Navbar />
      <Row className="my-1">
        <Col md={8}>
          
          <div></div>
          {cartItems.length === 0 ? (
            <div className="d-flex flex-column align-items-center mt-5 ">
              <img
                src="../../images/emptycart.svg"
                alt="Empty cart"
                style={{ height: "300px" }}
              />
              <h2 className="mt-4">
                Your cart is <b>Empty</b>
              </h2>
              <button className="btn btn-secondary mt-4">
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Go back
                </Link>
              </button>
            </div>
          ) : (<>
            <h1 className="mb-3 ml-4">Shopping Cart</h1>
            <ListGroup variant="flush">
              <Row style={{ background: "", fontSize: "18px" }}>
                <Col md={2} style={{ textAlign: "center" }}>
                  Image
                </Col>
                <Col md={2}>Product</Col>
                <Col md={2}>Price</Col>

                <Col md={2}>Quantity</Col>
                <Col md={2}>Total</Col>
                <Col md={2}>Remove</Col>
              </Row>
              {cartItems.map((item) => (
                <ListGroupItem>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image[0]}
                        alt={item.name}
                        rounded
                        style={{ height: "80px" }}
                      />
                    </Col>
                    <Col md={2}>
                      <Link
                        to={`/products/${item.product}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.prize}</Col>

                    <Col md={2}>
                      <button
                        className=" btn btn-sm btn-outline-success"
                        onClick={() => {
                          if (item.qty < item.avilableQuntity) {
                            dispatch(
                              addToCart(item.product, Number(item.qty) + 1)
                            );
                          } else {
                            setopen(true);
                            setmessage("please select less quntity");
                          }
                        }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      &nbsp; &nbsp;
                      {item.qty}
                      &nbsp; &nbsp;
                      <button
                        className=" btn btn-sm btn-outline-danger "
                        onClick={() => {
                          if (item.qty > 1) {
                            dispatch(
                              addToCart(item.product, Number(item.qty) - 1)
                            );
                          } else {
                            setopen(true);
                            setmessage("Atleast one item required");
                          }
                        }}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </Col>
                    <Col md={2}>${item.prize * item.qty}</Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i
                          className="fa fa-trash text-danger"
                          aria-hidden="true"
                        ></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup></>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  Total (
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                  Items In Your Cart
                </h2>
                <hr className="mt-3" />
                <h5 className="mt-1">
                  Amount:- $
                  {cartItems
                    .reduce((acc, item) => acc + item.prize * item.qty, 0)
                    .toFixed(2)}
                </h5>
                <h5>
                  Other Tax:- $
                  {cartItems
                    .reduce(
                      (acc, item) => acc + item.prize * item.qty * 0.05,
                      0
                    )
                    .toFixed(2)}
                </h5>
                <h5>
                  Shipping Charges:- $
                  {Number(
                    cartItems
                      .reduce((acc, item) => acc + item.prize * item.qty, 0)
                      .toFixed(2)
                  ) < 500 &&
                  Number(
                    cartItems
                      .reduce((acc, item) => acc + item.prize * item.qty, 0)
                      .toFixed(2)
                  ) > 0
                    ? 25
                    : 0}
                </h5>
                <h5>
                  Total Amount:- $
                  {Number(
                    cartItems
                      .reduce((acc, item) => acc + item.prize * item.qty, 0)
                      .toFixed(2)
                  ) +
                    Number(
                      cartItems
                        .reduce(
                          (acc, item) => acc + item.prize * item.qty * 0.05,
                          0
                        )
                        .toFixed(2)
                    ) +
                    Number(
                      cartItems
                        .reduce((acc, item) => acc + item.prize * item.qty, 0)
                        .toFixed(2) < 500 &&
                        cartItems
                          .reduce((acc, item) => acc + item.prize * item.qty, 0)
                          .toFixed(2) > 0
                        ? 25
                        : 0
                    )}
                </h5>
              </ListGroupItem>
              <Button
                type="button"
                className="btn-block mt-2 mx-2"
                disabled={cartItems.length === 0}
                onClick={checkout}
              >
                Proceed to Checkout
              </Button>
              <Link to="/home" className="btn btn-dark mt-2 mx-2">
                &nbsp; Continue Shopping
              </Link>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Orderconfirmmodel open={open} setopen={setopen} message={message} />
    </>
  );
};

export default CartScreen;
