import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { productdtlis } from "../Actions/productsActions";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Row, Col, ListGroup, Button, ListGroupItem } from "react-bootstrap";
import "../styles/productscreen.css";
import Navbar from "./UserDashboard";
import Orderconfirmmodel from "./Orderconfirmmodel";

const Productscreen = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [qty, setqty] = useState(1);
  const [open, setopen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const productdetails = useSelector((state) => state.productDetails);
  const { product } = productdetails;

  const [products, setProducts] = useState(product);

  useEffect(async () => {
    if (product._id !== id) {
      await dispatch(productdtlis(id));
    }
    setProducts(product);
  }, [dispatch, product]);

  const addToCartHandler = () => {
    if (product.qty < qty) {
      setopen(true);
    } else {
      navigate(`/cart/${id}/${qty}`);
    }
  };

  return (
    <>
      <Navbar />

      <div className="content mt-4">
        <Row>
          <Col md={6}>
            <img
              className="img-large"
              style={{
                height: "500px",
                width: "500px",
                objectFit: "contain",
                marginLeft: "100px",
              }}
              src={
                selectedImage ||
                (product.image ? product.image[0] : product.image)
              }
              alt={product.productname}
            ></img>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>
                  <title>{product.productname}</title>
                </h3>
                <h1>{product.productname}</h1>
              </ListGroup.Item>

              <ListGroup.Item>Prize : $ {product.prize}</ListGroup.Item>
              <ListGroup.Item>
                <Row xs={0} md={5} className="g-2">
                  {product.image &&
                    product.image.map((x) => (
                      <Col key={x}>
                        <Card>
                          <Button
                            className="thumbnail"
                            type="button"
                            variant="light"
                            onClick={() => setSelectedImage(x)}
                          >
                            <Card.Img
                              style={{
                                height: "70px",
                                width: "40px",
                                objectFit: "contain",
                              }}
                              variant="top"
                              src={x}
                              alt="product"
                            />
                          </Button>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                Description:
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.description,
                  }}
                ></div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroupItem>
              <Row>
                <Col>Status :</Col>
                <Col>
                  {product.status === "in stock" ? (
                    <span
                      style={{ fontWeight: "bolder" }}
                      className="text-success"
                    >
                      {product.status}
                    </span>
                  ) : product.status === "Out of Stock" ? (
                    <span
                      style={{ fontWeight: "bolder" }}
                      className="text-danger"
                    >
                      {product.status}
                    </span>
                  ) : product.status === "Pre order" ? (
                    <span
                      style={{ fontWeight: "bolder" }}
                      className="text-warning"
                    >
                      {product.status}
                    </span>
                  ) : product.status === "2-3 days" ? (
                    <span
                      style={{ fontWeight: "bolder" }}
                      className="text-info"
                    >
                      {product.status}
                    </span>
                  ) : (
                    <span className="text-info">{product.status}</span>
                  )}
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Available Quantity :-</Col>
                <Col>{product.qty}</Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              {product.status === "Out of Stock" ? (
                <div className=" ">
                  <span
                    style={{ fontWeight: "bolder", marginLeft: "120px" }}
                    className="text-danger text-center"
                  >
                    Product is Not Available
                  </span>
                </div>
              ) : (
                <div className="mb-3 row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-5 col-form-label"
                  >
                    Enter Quntity :-
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="number"
                      className="form-control-plaintext"
                      id="staticEmail"
                      value={qty}
                      onChange={(e) => {
                        setqty(e.target.value);
                      }}
                    />
                  </div>
                </div>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <Button
                className="btn-block btn-dark"
                type="button"
                onClick={addToCartHandler}
                disabled={qty <= 0}
              >
                Add to cart
              </Button>
            </ListGroupItem>
          </Col>
        </Row>
      </div>

      <Orderconfirmmodel
        open={open}
        setopen={setopen}
        message="Oops ! Product is not available in your required quantity"
      />
    </>
  );
};

export default Productscreen;
