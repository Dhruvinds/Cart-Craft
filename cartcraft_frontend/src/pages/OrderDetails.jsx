import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Alert } from "react-bootstrap";
import Box from "@mui/material/Box";
import Navbar from "./UserDashboard";
import { getOrderDetails } from "../Actions/orderActions";
import Loader from "../components/Loader";
import { color } from "@mui/system";

const OrderDetails = () => {
  const { id } = useParams();

  const orderDl = useSelector((state) => state.orderDetails);
  const { orderItem, loading } = orderDl;

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getOrderDetails(id));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      {loading && <Loader color="inherit" />}
      <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
        <Link to="/myorder" aria-current="page">
          <i
            className="fa-solid fa-arrow-left fa-xl text-black  mt-4"
            style={{ marginBottom: "8px", marginLeft: "23px" }}
          ></i>
        </Link>
      </Box>
      <Row>
        <Col md={8} className="mt-2">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3 className="pb-2">Shipping:-</h3>
              <p>
                <strong>Address :</strong>
                {orderItem.shippingAddress && orderItem.shippingAddress.address}
                &nbsp;
                {orderItem.shippingAddress && orderItem.shippingAddress.city}
                &nbsp;
                {orderItem.shippingAddress &&
                  orderItem.shippingAddress.postalcode}
                &nbsp;
                {orderItem.shippingAddress && orderItem.shippingAddress.country}
                &nbsp;
                {orderItem.shippingAddress && orderItem.shippingAddress.Phone}
                &nbsp;
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3 className="pb-2">Payment Method:-</h3>
              <p>
                <strong>{orderItem.paymentMethod}</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3 className="pb-2">Order Status:-</h3>
              {orderItem.status === "Pending" ? (
                <Alert variant="warning" style={{ width: "60rem" }}>
                  <Alert.Heading>{orderItem.status}</Alert.Heading>
                </Alert>
              ) : orderItem.status === "Order Placed" ? (
                <Alert
                  variant="success"
                  style={{ width: "60rem", height: "4rem" }}
                >
                  <Alert.Heading>{orderItem.status}</Alert.Heading>
                </Alert>
              ) : orderItem.status === "Out for Delivery" ? (
                <Alert variant="success" style={{ width: "60rem" }}>
                  <Alert.Heading>{orderItem.status}</Alert.Heading>
                </Alert>
              ) : orderItem.status === "Shipped" ? (
                <Alert variant="success" style={{ width: "60rem" }}>
                  <Alert.Heading>{orderItem.status}</Alert.Heading>
                </Alert>
              ) : orderItem.status === "Delivered" ? (
                <Alert
                  variant="success"
                  style={{ width: "60rem", height: "4rem" }}
                >
                  <Alert.Heading style={{ FontSize: "10px" }}>
                    {orderItem.status}
                  </Alert.Heading>
                </Alert>
              ) : (
                <Alert variant="red">
                  <Alert.Heading>Cancelled</Alert.Heading>
                </Alert>
              )}
              {/* <Alert variant="success">
                <strong>{orderItem.status}</strong>
              </Alert> */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="pb-2">Order Items:-</h2>

              <ListGroup variant="flush">
                {orderItem.orderItems &&
                  orderItem.orderItems.map((item, index) => (
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
                          <Link
                            to={`/products/${item.product}`}
                            className="text-black text-decoration-none"
                          >
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
                  <Col>
                    $
                    {orderItem.orderItems &&
                      orderItem.orderItems.reduce(
                        (acc, item) => acc + item.prize * item.qty,
                        0
                      )}
                  </Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderItem.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderItem.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderItem.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetails;
