import React, { Fragment, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { logout } from "../Actions/userAction";

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "white",
      color: "#7e57c2",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userdetails = useSelector((state) => state.userDetails);
  const { user } = userdetails;

  const [avatar, setavatar] = useState("  ");

  const logoutuser = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      var fullname = user.firstName + " " + user.lastName;
      setavatar(fullname);
    }
  }, [navigate, user]);

  return (
    <Fragment>
      <div className="flex flex-col w-full space-y-4 md:w-3/12 font-medium">
        <div
          style={{ background: "#7e57c2" }}
          className="flex items-center space-x-2 rounded shadow p-2 text-gray-100"
        >
          <div className="flex flex-col w-full">
            <center>
              {user.image ? (
                <Avatar src={user.image} />
              ) : (
                <Avatar {...stringAvatar(avatar)} />
              )}
            </center>
            <center>
              <span className="text-sm">Hello, &nbsp;</span>
              <span className="text-lg">{user.firstName}</span>
            </center>
          </div>
        </div>
        <div className="shadow hidden md:block w-full flex flex-col">
          <hr />
          <div
            onClick={(e) => navigate("/profile")}
            className={`${
              location.pathname === "/profile"
                ? "border-r-4 border-purple-700 bg-gray-200"
                : ""
            }  px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            My Accounts
          </div>
          <hr />

          <div
            onClick={(e) => navigate("/editprofile")}
            className={`${
              location.pathname === "/editprofile"
                ? "border-r-4 border-purple-700 bg-gray-200"
                : ""
            }  px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            Edit Profile
          </div>
          <hr />
          <div
            onClick={(e) => navigate("/changepassword")}
            className={`${
              location.pathname === "/changepassword"
                ? "border-r-4 border-purple-700 bg-gray-200"
                : ""
            }  px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            Change Password
          </div>
          <hr />
          <div
            onClick={logoutuser}
            className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
          >
            Logout
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
