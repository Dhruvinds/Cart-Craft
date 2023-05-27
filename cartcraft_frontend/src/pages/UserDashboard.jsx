import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { logout } from "../Actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Loader from "../components/Loader";

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "white",
      color: "#7e57c2",
      height: "35px",
      width: "35px",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const pages = [];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = () => {
    dispach(logout());
  };

  const [avatar, setavatar] = useState("   ");
  const User = useSelector((state) => state.userLogin);
  const { userInfo } = User;

  const userdetails = useSelector((state) => state.userDetails);
  const { loading, user } = userdetails;

  const cartNumber = useSelector((state) => state.cart);
  const { cartItems } = cartNumber;

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const navigate = useNavigate();
  const dispach = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (user.firstName) {
        var fullname = user.firstName + " " + user.lastName;
        setavatar(fullname);
      } else {
        var fullname = userInfo.firstName + " " + userInfo.lastName;
        setavatar(fullname);
      }
    }
  }, [navigate, userInfo, dispach]);

  return (
    <>
      <AppBar
        position="static"
        style={{ background: "#7e57c2", height: "65px" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
              <Link to="/home" aria-current="page">
                <i
                  className="fa-solid fa-arrow-left fa-xl text-white"
                  style={{ marginBottom: "8px" }}
                ></i>
              </Link>
            </Box>
            <Link className="nav-link active" aria-current="page" to="/home">
              <Typography
                variant="h6"
                // noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <img
                  src="../../images/Group.png"
                  alt="Login_Graphics"
                  style={{ height: "40px" }}
                />
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box className="mr-5">
              <Badge
                badgeContent={wishlistItems.reduce((acc, item) => acc + 1, 0)}
                color="error"
              >
                <Link
                  to="/wishlist"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <FavoriteIcon />
                </Link>
              </Badge>
            </Box>
            <Box className="mr-5">
              <Badge
                badgeContent={cartItems.reduce((acc, item) => acc + 1, 0)}
                color="error"
              >
                <Link
                  to="/cart/:id/:qty"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ShoppingCartIcon />
                </Link>
              </Badge>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user.image ? (
                    <Avatar src={user.image} />
                  ) : (
                    <Avatar {...stringAvatar(avatar)} />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/profile"
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>

                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/myorder"
                >
                  <MenuItem onClick={handleClose}>My order</MenuItem>
                </Link>

                {(userInfo.role.name === "admin" ||
                  userInfo.role.name === "super admin" ||
                  userInfo.role.name === "guest" ||
                  userInfo.role.name === "customized") && (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/dashboard"
                  >
                    <MenuItem>Dashboard</MenuItem>
                  </Link>
                )}

                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  <MenuItem onClick={logoutuser}>Logout</MenuItem>
                </Link>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        {loading && <Loader />}
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
