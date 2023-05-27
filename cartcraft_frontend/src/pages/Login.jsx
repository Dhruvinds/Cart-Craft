import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Icon from "@mdi/react";
import { mdiGmail, mdiLock } from "@mdi/js";
import "../styles/RegistartionStyle.css";
import Navbar from "../components/Navbar";
import { login } from "../Actions/userAction";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import isEmail from "validator/lib/isEmail";
import Loader from "../components/Loader";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

const Login = () => {
  // for remember me functionality
  const details = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : "";

  // state for forgetpassword model , error snackbar , and TextFields
  const [open, setOpen] = React.useState(false);
  const [errmessage, seterrmessage] = React.useState(false);

  const [sucmsg, setsucmsg] = React.useState(false);
  const [validmessage, setvalidmessage] = React.useState(false);
  const [user, setuser] = useState({
    email: details.email,
    password: details.password,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const User = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = User;

  // for save value of textfields to state
  function change(e) {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  }

  // if remeber me checkbox is checked then store email password to localStorage else dispach data to backend without store in localstorage for login
  function submitData() {
    var checkbox = document.getElementById("flexCheckDefault").checked;
    if (checkbox) {
      localStorage.setItem("userDetails", JSON.stringify(user));
    } else {
      localStorage.removeItem("userDetails");
    }
    if (!user.email || !user.password) {
      setvalidmessage(true);
    } else {
      dispatch(login(user.email, user.password));
    }
  }

  // open forget password model
  const handleClickOpen = () => {
    setOpen(true);
    setuser({
      ...user,
      forget: "",
    });
  };

  // close snackbar error
  const errmessageclose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    seterrmessage(false);
  };
  // close snackbar success
  const sucmsgclose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsucmsg(false);
  };

  // close model of forgrt password and send email to database
  const handleClose = async () => {
    const email = user.forget;
    if (isEmail(email)) {
      const { data } = await axios.post(
        `http://localhost:5000/api/users/forgetpassword`,
        { email }
      );
      if (data.error) {
        seterrmessage(true);
        setOpen(false);
      } else {
        setsucmsg(true);
        setOpen(false);
      }
    } else {
      alert("enter valid email");
      setOpen(false);
    }
  };

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setvalidmessage(false);
  };

  function Close() {
    setOpen(false);
  }
  // check if user alredy login or not
  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo, navigate]);

  return (
    <>
      <Navbar />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={errmessage}
        autoHideDuration={4000}
        onClose={errmessageclose}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          User With this email does not exists
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={validmessage}
        onClose={handleClose1}
        autoHideDuration={3000}
      >
        <Alert severity="error" onClose={handleClose1} sx={{ width: "100%" }}>
          All Fields are required
        </Alert>
      </Snackbar>

      {/* for success message */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={sucmsg}
        autoHideDuration={4000}
        onClose={sucmsgclose}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Reset password has been sent to your registerd mail
        </Alert>
      </Snackbar>

      {loading && <Loader color="inherit" />}
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
          <div
            className="shadow p-3 mb-5 bg-body rounded"
            style={{ marginTop: "20%" }}
          >
            <div className="container mt-4 ">
              <h2>Sign In</h2>

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
                  <input
                    name="email"
                    placeholder="Email"
                    onChange={change}
                    value={user.email}
                    type="text"
                    className="form-control"
                  />
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
                    <input
                      placeholder="Password"
                      name="password"
                      type="password"
                      onChange={change}
                      value={user.password}
                      className="form-control"
                    />
                  </div>
                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Remember me
                    </label>
                  </div>
                  <div
                    className="btn btn-primary form-control mt-3"
                    onClick={() => submitData()}
                  >
                    Log In
                  </div>
                  <div className="mt-3 text-center">
                    <p>
                      <Link
                        to="/login"
                        style={{ textDecoration: "none" }}
                        onClick={handleClickOpen}
                      >
                        Forget Password?
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dialogbox">
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { width: "30%", height: "29%" } }}
          >
            <DialogTitle>
              Forget Password
              <IconButton
                style={{ left: "60%" }}
                edge="start"
                color="error"
                onClick={Close}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <TextField
                autoFocus
                value={user.forget}
                onChange={change}
                margin="dense"
                id="name"
                name="forget"
                label="Enter your email address"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <button
                className="btn btn-primary form-control"
                type="submit"
                onClick={handleClose}
              >
                Send Request
              </button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default Login;
