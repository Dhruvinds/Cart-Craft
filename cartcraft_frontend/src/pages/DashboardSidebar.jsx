import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, logout } from "../Actions/userAction";

const drawerWidth = 240;

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "white",
      color: "#7e57c2",
      height: "35px",
      width: "35px",
      marginBottom: "px",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DashboardSidebar({ children }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const dispach = useDispatch();

  const [avatar, setavatar] = useState("   ");
  const User = useSelector((state) => state.userLogin);
  const { userInfo } = User;

  const userdetails = useSelector((state) => state.userDetails);
  const { loading, user } = userdetails;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutuser = () => {
    dispach(logout());
  };

  useEffect(async () => {
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ background: "#7e57c2", height: "65px" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Link to="/home">
              <img
                src="../images/Group.png"
                alt="Login_Graphics"
                style={{ height: "40px", marginBottom: "0px" }}
              />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 0 }} style={{ marginLeft: "auto" }}>
            <Tooltip title="Open settings" arrow>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user.image ? (
                  <Avatar src={user.image} />
                ) : (
                  <Avatar {...stringAvatar(avatar)} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            sx={{ mt: "45px", color: "#7e57c2" }}
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
            <Link className="nav-link active" aria-current="page" to="/profile">
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>

            <Link className="nav-link active" aria-current="page" to="/login">
              <MenuItem onClick={logoutuser}>Logout</MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} style={{ zIndex: "0" }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Category",
            "SubCategory",
            "Manufacturer",
            "Products",
            "allOrder",
          ].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                navigate(`/${text}`);
              }}
            >
              <ListItemIcon>
                {text === "Category" && (
                  <Tooltip title="Category" placement="right" arrow>
                    <img
                      src={"../images/Category.png"}
                      alt="Category"
                      // style={{ height: "40px", marginBottom: "0px" }}
                    />
                  </Tooltip>
                )}
                {text === "SubCategory" && (
                  <Tooltip title="Sub Category" placement="right" arrow>
                    <img
                      src="../images/subcategory.png"
                      alt="Subcategory"
                      // style={{ height: "40px", marginBottom: "0px" }}
                    />
                  </Tooltip>
                )}
                {text === "Manufacturer" && (
                  <Tooltip title="Manufacturer" placement="right" arrow>
                    <img
                      src="../images/Manufacture.png"
                      alt="Manufacture"
                      // style={{ height: "40px", marginBottom: "0px" }}
                    />
                  </Tooltip>
                )}
                {text === "Products" && (
                  <Tooltip title="Product" placement="right" arrow>
                    <img
                      src="../images/product.png"
                      alt="Prodect"
                      // style={{ height: "40px", marginBottom: "0px" }}
                    />
                  </Tooltip>
                )}
                {text === "allOrder" && (
                  <Tooltip title="AllOrder" placement="right" arrow>
                    <img
                      src="../images/subcategory.png"
                      alt="Subcategory"
                      // style={{ height: "40px", marginBottom: "0px" }}
                    />
                  </Tooltip>
                )}
              </ListItemIcon>

              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        {userInfo.role.name === "super admin" && (
          <List>
            <ListItem onClick={() => navigate("/userlist")}>
              <Tooltip title="Userlist" placement="right" arrow>
                <img src="../images/1.png" alt="Prodect" />
              </Tooltip>
            </ListItem>
            <ListItem onClick={() => navigate("/managepermission")}>
              <Tooltip title="manage permission" placement="right" arrow>
                <img src="../images/2.png" alt="Prodect" />
              </Tooltip>
            </ListItem>
          </List>
        )}
      </Drawer>
      <Box component="main" className="mt-5" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
