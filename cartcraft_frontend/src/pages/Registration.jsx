import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Actions/userAction";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccount, mdiGmail, mdiLock } from "@mdi/js";
import Navbar from "../components/Navbar";
import "../styles/RegistartionStyle.css";
import Message from "../components/Message";
import Loader from "../components/Loader";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userRegister);
  const { error, userInfores, loading } = user;

  const User = useSelector((state) => state.userLogin);
  const { userInfo } = User;

  useEffect(() => {
    if (userInfores) {
      navigate("/login");
    } else {
      if (userInfo) {
        navigate("/dashboard");
      }
    }
  }, [userInfo, navigate, userInfores]);

  return (
    <>
      <Navbar />
      {loading && <Loader />}
      <div
        className="row img-fluid"
        style={{
          backgroundImage: `url("./images/Login_BG.svg")`,
          backgroundRepeat: "no-repeat",
          height: "88vh",
        }}
      >
        <div className="col-md-7">
          <img
            className="computer img-fluid"
            src="./images/Login_Graphics.png"
            alt="Login_Graphics"
          />
        </div>

        <div className="col-md-4">
          {error && <Message variant="danger">{error}</Message>}
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              acceptTerms: false,
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string()
                .min(2, "To Short Name")
                .required("First Name is required")
                .matches(
                  /^[aA-zZ]+$/,
                  "Please enter a valid First Name ( Only characters are allowed )"
                ),
              lastName: Yup.string()
                .required("Last Name is required")
                .matches(
                  /^[aA-zZ]+$/,
                  "Please enter a valid Last Name ( Only characters are allowed )"
                ),
              email: Yup.string()
                .email("Please enter a valid Email (xyz@gmail.com)")
                .required("Email is required"),
              password: Yup.string()
                .min(
                  8,
                  "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                )
                .required("Password is required")
                .matches(
                  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                  "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                ),
              confirmPassword: Yup.string()
                .oneOf(
                  [Yup.ref("password"), null],
                  "Password and Confirm Password does not match"
                )
                .required("Confirm Password is required"),
              acceptTerms: Yup.bool().oneOf(
                [true],
                " Please Accept Our Terms & Conditions "
              ),
            })}
            onSubmit={(fields) => {
              dispatch(
                register(
                  fields.firstName,
                  fields.lastName,
                  fields.email,
                  fields.password,
                  fields.confirmPassword
                )
              );
            }}
            render={({ errors, status, touched }) => (
              <Form>
                <div className="shadow p-3 mb-5 bg-body rounded">
                  <div className="container mt-4">
                    <h2>Sign Up</h2>
                    <div className="mt-3">
                      <div className="input-group">
                        <div className="input-group-text bg-light ">
                          <Icon
                            path={mdiAccount}
                            title="User Profile"
                            size={1}
                            color="grey"
                          />
                        </div>
                        <Field
                          placeholder="First Name"
                          name="firstName"
                          type="text"
                          className={
                            "form-control" +
                            (errors.firstName && touched.firstName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="input-group">
                        <div className="input-group-text bg-light">
                          <Icon
                            path={mdiAccount}
                            title="User Profile"
                            size={1}
                            color="grey"
                          />
                        </div>
                        <Field
                          placeholder="Last Name"
                          name="lastName"
                          type="text"
                          className={
                            "form-control" +
                            (errors.lastName && touched.lastName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="input-group">
                        <div className="input-group-text bg-light">
                          <Icon
                            path={mdiGmail}
                            title="User Profile"
                            size={1}
                            color="grey"
                          />
                        </div>
                        <Field
                          name="email"
                          placeholder="Email"
                          type="text"
                          className={
                            "form-control" +
                            (errors.email && touched.email ? " is-invalid" : "")
                          }
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="input-group">
                        <div className="input-group-text bg-light">
                          <Icon
                            path={mdiLock}
                            title="User Profile"
                            size={1}
                            color="grey"
                          />
                        </div>
                        <Field
                          name="password"
                          placeholder="Password"
                          type="password"
                          className={
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
                    </div>

                    <div className="mt-3">
                      <div className="input-group">
                        <div className="input-group-text bg-light">
                          <Icon
                            path={mdiLock}
                            title="User Profile"
                            size={1}
                            color="grey"
                          />
                        </div>
                        <Field
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          type="password"
                          className={
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
                    </div>

                    <div className="form-check mt-3">
                      <Field
                        type="checkbox"
                        name="acceptTerms"
                        id="acceptTerms"
                        className={
                          "form-check-input " +
                          (errors.acceptTerms && touched.acceptTerms
                            ? " is-invalid"
                            : "")
                        }
                      />

                      {/* Open Modal For terms And Condition */}
                      <label
                        className="form-check-label"
                        htmlFor="autoSizingCheck"
                      >
                        <span style={{ color: "black" }}>
                          I accept the &nbsp;
                        </span>
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <span style={{ color: "blue", cursor: "pointer" }}>
                            Terms of use{" "}
                            <span style={{ color: "black" }}>&</span> Privacy
                            Policy
                          </span>
                        </a>
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-scrollable">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title text-dark"
                                  id="exampleModalLabel"
                                >
                                  Terms of use & Privacy Policy
                                </h5>
                              </div>
                              <div className="modal-body text-dark">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Consequuntur illo cum,
                                ducimus, quis voluptatum amet eveniet quisquam
                                quod omnis harum necessitatibus voluptas facere.
                                Laborum officia et assumenda voluptate corporis
                                vitae. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Animi consequatur asperiores
                                ab! Excepturi, repudiandae! Velit dolorem quae
                                recusandae unde reiciendis! In commodi vero
                                dolorem repudiandae laboriosam, praesentium nemo
                                eveniet quae at eligendi culpa ratione et
                                corrupti rem. Iure, et vitae. Lorem ipsum dolor
                                sit, amet consectetur adipisicing elit. Cum
                                molestiae quas suscipit qui sequi nulla aut
                                labore! Facere voluptates laborum iste in
                                sapiente pariatur nihil! Nostrum corporis
                                adipisci dolore distinctio nesciunt at deserunt
                                cupiditate consequatur impedit, dignissimos ea
                                debitis harum magnam inventore excepturi libero
                                rerum temporibus. Earum, eum, aliquid rem optio
                                repellendus nostrum facilis ipsa est quia,
                                labore provident facere qui modi odit!
                                Consequatur dolorum, vitae mollitia nihil quasi
                                nostrum maiores sit voluptatem. Quos, voluptates
                                error. Aspernatur, obcaecati ea ipsam, nesciunt
                                commodi libero tempore velit recusandae dolorem
                                minus ducimus, id iure maxime dolores
                                perspiciatis aliquam autem inventore magni
                                blanditiis laborum.
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-primary new"
                                  data-bs-dismiss="modal"
                                >
                                  Accept
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-secondary new"
                                  data-bs-dismiss="modal"
                                >
                                  Disagree
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <ErrorMessage
                        name="acceptTerms"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary mt-4 form-control"
                    >
                      Sign Up
                    </button>
                    <div className="mt-4 text-center">
                      <p>
                        Have an account with us? &nbsp;
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          Login here
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Registration;
