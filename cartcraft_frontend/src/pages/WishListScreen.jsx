import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { Card } from "react-bootstrap";
import Navbar from "./UserDashboard";
import { Link, useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { removeFromWishlist } from "../Actions/wishlistActions";

const WishListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  return (
    <>
      <Navbar />
      <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
        <Link to="/home" aria-current="page">
          <i
            className="fa-solid fa-arrow-left fa-xl text-black  mt-4"
            style={{ marginBottom: "8px", marginLeft: "23px" }}
          ></i>
        </Link>
      </Box>

      {wishlistItems.length === 0 ? (
        <div className="d-flex flex-column align-items-center ">
          <img
            src="../../images/empty-wishlist.svg"
            alt="Empty wishlist"
            style={{ height: "170px", marginTop: "30px" }}
          />
          <h2 className="mt-4">
            <center>
              {" "}
              <b>Empty Wishlist</b>
              <h5>You have no items in your wishlist. Start adding!</h5>
            </center>
          </h2>
          <button className="btn btn-secondary mt-3">
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
              Go back
            </Link>
          </button>
        </div>
      ) : (
        <div className="row ml-3">
          <h1 className=" text-center mb-2  " style={{ color: "#7e57c2" }}>
            My Wishlist
          </h1>
          {wishlistItems.length !== 0
            ? wishlistItems.map((x) => {
                return (
                  <>
                    <div className="col-lg-3 col-md-4 col-sm-6 h-auto mt-2 ">
                      <Card
                        sx={{ border: "lightgray " }}
                        style={{ width: "85%", height: "100%" }}
                      >
                        <Card.Img
                          component="img"
                          style={{
                            height: "200px",
                            width: "300px",
                            objectFit: "contain",
                          }}
                          src={x.image[0]}
                        />
                        <Card.Body>
                          <Card.Title
                            gutterBottom
                            variant="h4"
                            component="div"
                            style={{ fontWeight: "bolder", color: "green" }}
                          >
                            {x.name}
                          </Card.Title>
                          <Card.Text>
                            <b>
                              <h5 className="mt-3">
                                {x.category.name.charAt(0).toUpperCase() +
                                  x.category.name.slice(1)}
                              </h5>
                            </b>
                          </Card.Text>
                          {/* <Card.Text>
                            <div
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "198px",
                                height: "77px",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: x.description,
                              }}
                            ></div>
                          </Card.Text> */}
                          <Card.Text>
                            <b>
                              <h5 className="mt-3">$ {x.prize}.00</h5>
                            </b>
                          </Card.Text>

                          <div className="row">
                            <div className="col-10 mt-2">
                              <button
                                className="btn btn-sm btn-danger form-control"
                                onClick={() => {
                                  navigate(`/cart/${x.product}/${1}`);
                                }}
                              >
                                Add to cart
                              </button>
                            </div>
                            <div className="col-2 mt-2">
                              <button
                                onClick={() =>
                                  removeFromWishlistHandler(x.product)
                                }
                              >
                                <HighlightOffIcon
                                  style={{ color: "red", fontSize: "30" }}
                                />
                              </button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </>
                );
              })
            : []}
        </div>
      )}
    </>
  );
};

export default WishListScreen;
