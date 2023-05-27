import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import Icon from "@mdi/react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import "../styles/RegistartionStyle.css";
import Navbar from "../components/Navbar";
import { mdiLock } from "@mdi/js";
import axios from "axios";

const ResetPassword = () => {
  const [errmessage, seterrmessage] = React.useState(false);
  const [err, seterr] = React.useState("");

  const navigate = useNavigate();
  const { token } = useParams();

  const user = useSelector((state) => state.userRegister);
  const { userInfo, error } = user;

  function showerror(data) {
    if (data.error) {
      seterr(data.error);
      seterrmessage(true);
    } else {
      navigate("/login");
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    seterrmessage(false);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo, navigate]);

  return (
    <>
      <Navbar />
      {/* error message */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={errmessage}
        onClose={handleClose}
        autoHideDuration={4000}
      >
        <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
          {err}
        </Alert>
      </Snackbar>

      {/* session expired message */}
      <div
        className="row img-fluid"
        style={{
          backgroundImage: `url("../images/Login_BG.svg")`,
          backgroundRepeat: "no-repeat",
          height: "88vh",
        }}
      >
        <div className="col-md-7">
          <img
            className="computer img-fluid"
            src="../images/Login_Graphics.png"
            alt="Login_Graphics"
          />
        </div>

        <div className="col-md-4">
          {error && <Message variant="danger">{error}</Message>}
          <div
            className="shadow p-3 mb-5 bg-body rounded"
            style={{ marginTop: "25%" }}
          >
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object().shape({
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
              onSubmit={async (fields) => {
                const password = fields.password;
                const confirmPassword = fields.confirmPassword;
                const { data } = await axios.put(
                  "http://localhost:5000/api/users/resetpassword",
                  { token, password, confirmPassword }
                );
                showerror(data);
              }}
              render={({ errors, status, touched }) => (
                <Form>
                  <div className="container mt-4">
                    <h2>Reset password</h2>

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

                    <button
                      type="submit"
                      className="btn btn-primary mt-4 form-control"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
