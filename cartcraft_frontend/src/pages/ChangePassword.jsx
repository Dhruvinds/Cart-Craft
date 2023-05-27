import React, { Fragment, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { changePassword, getUserDetails } from "../Actions/userAction";

const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passwordChange = useSelector((state) => state.userPasswordChange);
  const { error, success } = passwordChange;
  const userdetails = useSelector((state) => state.userDetails);
  const { user } = userdetails;
  const userlogin = useSelector((state) => state.userLogin);
  const { userInfo } = userlogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.firstName) {
        dispatch(getUserDetails("profile"));
      }
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8 mt-0">
        <div className="shadow-lg border">
          {error && (
            <Message variant="danger">Old password is Incorrect</Message>
          )}
          {success && (
            <Message variant="success">password change Successfully</Message>
          )}
          <div className="py-4 px-4 text-lg font-semibold border-t-2 border-purple-700">
            Change Password
          </div>
          <hr />
          <div className="py-4 px-4 md:px-8 lg:px-16 flex flex-col space-y-4">
            <Formik
              initialValues={{
                oldPassword: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object().shape({
                oldPassword: Yup.string().required("Old password is required"),
                password: Yup.string()
                  .min(8, "Password must be at least 8 characters")
                  .required("Password is required")
                  .matches(
                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                  ),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Confirm Password is required"),
              })}
              onSubmit={(fields) => {
                const oldPassword = fields.oldPassword;
                const password = fields.password;
                const confirmPassword = fields.confirmPassword;

                dispatch(
                  changePassword(oldPassword, password, confirmPassword)
                );
              }}
              render={({ errors, status, touched }) => (
                <Form>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="oldPassword">Old Password</label>
                    <Field
                      className="z-10 border px-4 py-2 w-full focus:outline-none"
                      name="oldPassword"
                      type="password"
                      class={
                        "form-control" +
                        (errors.oldPassword && touched.oldPassword
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="oldPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 mt-2">
                    <label htmlFor="newPassword">New Password</label>
                    <Field
                      className="z-10 border px-4 py-2 w-full focus:outline-none"
                      name="password"
                      type="password"
                      class={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 mt-2">
                    <label htmlFor="newPassword">Confirm Password</label>
                    <Field
                      className="z-10 border px-4 py-2 w-full focus:outline-none"
                      name="confirmPassword"
                      type="password"
                      class={
                        "form-control" +
                        (errors.confirmPassword && touched.confirmPassword
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ background: "#7e57c2", color: "white" }}
                    className="mt-4 form-control btn"
                  >
                    Submit
                  </button>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const Changepassword = (props) => {
  return (
    <Fragment>
      <Layout children={<Setting />} />
    </Fragment>
  );
};

export default Changepassword;
