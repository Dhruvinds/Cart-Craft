import React, { Fragment, useEffect, useState } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../Actions/userAction";

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userlogin = useSelector((state) => state.userLogin);
  const { userInfo } = userlogin;

  const userdetails = useSelector((state) => state.userDetails);
  const { user } = userdetails;

  useEffect(async () => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (user.firstName) {
        setUserData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role.name,
        });
      }
    }
    await dispatch(getUserDetails("profile"));
  }, [navigate, userInfo, dispatch, user.firstName]);

  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8 mt-0">
        <div className="shadow-lg border">
          <div className="py-4 px-4 text-lg font-semibold border-t-2 border-purple-700">
            Personal Information
          </div>
          <hr />
          <div className="py-1 px-4 md:px-8 lg:px-10 flex flex-col space-y-4 mt-2">
            <div className="flex flex-col ">
              <label htmlFor="name"> First Name</label>
              <input
                value={userData.firstName}
                readOnly
                type="text"
                id="name"
                className="cursor-not-allowed border px-3 py-2 w-full focus:outline-none bg-gray-200 w-full focus:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="name"> Last Name</label>
              <input
                value={userData.lastName}
                readOnly
                type="text"
                id="name"
                className=" cursor-not-allowed border px-3 py-2 w-full focus:outline-none bg-gray-200 w-full focus:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="email">Email</label>
              <input
                value={userData.email}
                readOnly
                type="email"
                id="email"
                className=" cursor-not-allowed border px-3 py-2 bg-gray-200 w-full focus:outline-none focus:cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col mb-4 ">
              <label htmlFor="number">User Role</label>
              <input
                value={userData.role}
                readOnly
                type="text"
                id="text"
                className=" cursor-not-allowed border px-3 py-2 w-full focus:outline-none bg-gray-200 w-full focus:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserProfile = (props) => {
  return (
    <Fragment>
      <Layout children={<Profile />} />
    </Fragment>
  );
};

export default UserProfile;
