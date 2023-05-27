import React, { useEffect } from "react";
import Navbar from "./UserDashboard";
import { listMyorders } from "../Actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

import { Button, Table } from "react-bootstrap";

const Myorder = ({ product }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, orders, error } = orderListMy;

  useEffect(() => {
    dispatch(listMyorders());
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="mt-2" style={{ textAlign: "center", color: "#7e57c2" }}>
        My Orders
      </h1>
      <div className="row order-products justify-content-between">
        <div className="col">
          {loading ? (
            <Loader color="inherit" />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className="col-lg-12">
              {orders &&
                orders.map((order, index) => (
                  <LinkContainer to={`/order/${order._id}`}>
                    <div
                      key={index}
                      className="order-box shadow p-3 mb-3 bg-white rounded ms-4 mt-3 me-4 "
                    >
                      <div className="order-product row" key={index}>
                        <div className="col-md-2 col-6">
                          <img
                            src={order.orderItems[0].image[0]}
                            alt={order.orderItems[0].name}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                        <div className="col-md-2 d-flex align-items-center mt-md-0">
                          <h6 className="mt-4">{order.orderItems[0].name} </h6>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center  ">
                          <p className="mt-4">
                            {order.createdAt.substring(0, 10)}
                          </p>
                        </div>

                        <div className="mt-2 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center  ">
                          <h5 style={{ color: "#7e57c2" }}>Status</h5>
                          <p className="mt-1">
                            {order.status === "Order Placed" ? (
                              <p
                                className=""
                                style={{ fontWeight: "bolder", color: "green" }}
                              >
                                Order placed
                              </p>
                            ) : order.status === "Shipped" ? (
                              <p
                                className=""
                                style={{ fontWeight: "bolder", color: "black" }}
                              >
                                Shipped
                              </p>
                            ) : order.status === "Out for Delivery" ? (
                              <p
                                className=""
                                style={{ fontWeight: "bolder", color: "black" }}
                              >
                                Out for delivery
                              </p>
                            ) : order.status === "Delivered" ? (
                              <p
                                className=""
                                style={{ fontWeight: "bolder", color: "green" }}
                              >
                                Delivered
                              </p>
                            ) : (
                              <p
                                className=""
                                style={{ fontWeight: "bolder", color: "red" }}
                              >
                                Cancelled
                              </p>
                            )}
                          </p>
                          {/* <p> {order.status}</p> */}
                        </div>
                        <div className="mt-2 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center  ">
                          <h5 style={{ color: "#7e57c2" }}>QUANTITY</h5>

                          <p className="mt-1">{order.orderItems[0].qty}</p>
                        </div>

                        <div className="mt-2 mt-md-0 col-md-2 col-6 align-items-center  d-flex flex-column justify-content-center">
                          <h5
                            style={{
                              color: "#7e57c2",
                            }}
                          >
                            TOTAL
                          </h5>
                          <p
                            className="mt-1"
                            style={{ fontWeight: "bolder", color: "black" }}
                          >
                            ${order.totalPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </LinkContainer>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myorder;
