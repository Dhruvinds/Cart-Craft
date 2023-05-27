import React, { Fragment, useState, useEffect } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateProfile } from "../Actions/userAction";
import Message from "../components/Message";
import { Form } from "react-bootstrap";
import axios from "axios";

const ProfileComponent = () => {
  const [firstNameError, setFirstNameError] = useState({
    display: "none",
  });
  const [lastNameError, setLastNameError] = useState({
    display: "none",
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [uploading, setUploading] = useState(false);
  const [image, setimage] = useState("");
  const userdetails = useSelector((state) => state.userDetails);
  const { user } = userdetails;
  const userlogin = useSelector((state) => state.userLogin);
  const { userInfo } = userlogin;
  const userUpdate = useSelector((state) => state.userProfileUpdate);
  const { loading, success, error } = userUpdate;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.firstName) {
        dispatch(getUserDetails("profile"));
      } else {
        setUserData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
        });
      }
    }
  }, [navigate, userInfo, user, dispatch]);

  const handleSubmit = () => {
    var validateFristName = /^[aA-zZ]+$/.test(userData.firstName);
    var validateLastName = /^[aA-zZ]+$/.test(userData.lastName);

    if (!validateFristName) {
      setFirstNameError({ display: "block" });
    } else if (!validateLastName) {
      setLastNameError({ display: "block" });
    } else {
      setFirstNameError({ display: "none" });
      setLastNameError({ display: "none" });

      dispatch(updateProfile(userData.firstName, userData.lastName, image));
    }
  };
  async function uploadFileHandler(e) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.put(
        "http://localhost:5000/api/upload/profile",
        formData,
        config
      );
      setimage(`http://localhost:5000` + data);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  }
  console.log(image);
  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8 mt-0">
        <div className="shadow-lg border">
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">Profile update Successfully</Message>
          )}
          <div className="py-4 px-4 text-lg font-semibold border-t-2 border-purple-700">
            Add details for change
          </div>
          <hr />
          <div className="py-4 px-4 md:px-8 lg:px-16 flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name"> First Name</label>
              <input
                onChange={change}
                value={userData.firstName}
                type="text"
                id="firstName"
                className="border px-4 py-2 w-full focus:outline-none"
              />
              <div
                style={firstNameError}
                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
              >
                Please enter valid First Name ( Only characters are allowed )
              </div>
            </div>

            <div className="flex flex-col ">
              <label htmlFor="name"> Last Name</label>
              <input
                onChange={change}
                value={userData.lastName}
                type="text"
                id="lastName"
                className="border px-4 py-2 w-full focus:outline-none"
              />
              <div
                style={lastNameError}
                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
              >
                Please enter valid Last Name ( Only characters are allowed )
              </div>
            </div>

            <div className="flex flex-col ">
              <label htmlFor="email">Email</label>
              <input
                value={userData.email}
                readOnly
                type="email"
                id="email"
                className="cursor-not-allowed border px-4 py-2 bg-gray-200 w-full focus:outline-none focus:cursor-not-allowed"
              />
              <span className="text-xs text-gray-500">
                You can't change your email
              </span>
            </div>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>

              <Form.Control
                type="text"
                readOnly
                placeholder="Selected Image"
                value={image}
                onChange={(e) => setimage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>

            <div
              onClick={(e) => handleSubmit()}
              style={{ background: "#7e57c2" }}
              className="w-full text-center cursor-pointer px-4 py-2 text-gray-100 mt-3"
            >
              Update Information
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const EditProfile = (props) => {
  return (
    <Fragment>
      <Layout children={<ProfileComponent />} />
    </Fragment>
  );
};

export default EditProfile;
