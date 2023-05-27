import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, makeStyles } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";

import "../styles/home.css";
import { addToWishlist, removeFromWishlist } from "../Actions/wishlistActions";

const useStyle = makeStyles((theme) => ({
  favorite: {
    cursor: "pointer",
    background: "#fff",
    color: "#c2c2c2",
  },
  red: {
    color: "#ff4343",
  },
}));

const ProductScreen = ({ product, icon }) => {
  const dispatch = useDispatch();
  const classes = useStyle();

  const navigate = useNavigate();
  // const productdetails = useSelector((state) => state.productDetails);
  // const { product } = productdetails;

  const handleWishlist = () => {
    dispatch(addToWishlist(product._id));
    navigate(`/wishlist`);
  };

  return (
    <>
      <Card
        className="productcard mb-5"
        sx={{ maxWidth: 345, border: "lightgray " }}
      >
        <CardActionArea>
          <div dir="rtl"></div>
          <Link to={`/products/${product._id}`}>
            <CardMedia
              component="img"
              style={{
                height: "200px",
                width: "300px",
                objectFit: "contain",
              }}
              src={product.image[0]}
              alt={product.productname}
            />
          </Link>

          <CardContent style={{ background: "transparent" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontWeight: "bolder" }}
            >
              <Link
                to={`/products/${product._id}`}
                style={{ textDecoration: "none", color: "green" }}
              >
                {product.productname}
              </Link>
            </Typography>

            <Typography variant="body2">
              <b>
                <h5 className="mt-3">
                  <Link
                    to={`/products/${product._id}`}
                    style={{ textDecoration: "none", color: "#7e57c2" }}
                  >
                    {product.category.name.charAt(0).toUpperCase() +
                      product.category.name.slice(1)}
                  </Link>
                </h5>
              </b>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Link
                to={`/products/${product._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "198px",
                    height: "57px",
                  }}
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>
                <Link
                  to={`/products/${product._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h5 className="mt-3"> $ {product.prize}.00</h5>
                </Link>
                {product.status === "Out of Stock" ? (
                  <p
                    style={{
                      fontWeight: "bolder",
                      color: "red",
                      marginLeft: "130px",
                      marginTop: "-20px",
                    }}
                  >
                    {product.status}
                  </p>
                ) : (
                  <p></p>
                )}
              </b>
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
            <div className="row">
              <div className="col-10">
                <button
                  disabled={product.status === "Out of Stock"}
                  className="btn btn-sm btn-danger form-control mt-2"
                  onClick={() => {
                    navigate(`/cart/${product._id}/${1}`);
                  }}
                >
                  Add to cart
                </button>
              </div>
              <div className="col-2  mt-2 ">
                <Box className={classes.favorite} onClick={handleWishlist}>
                  <FavoriteIcon
                    className={icon ? classes.red : ""}
                    style={{ fontSize: 25 }}
                  />
                </Box>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ProductScreen;
