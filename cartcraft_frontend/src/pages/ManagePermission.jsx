import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DashboardSidebar from "./DashboardSidebar";
import { Form, Table } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import axios from "axios";
import { getUserDetails } from "../Actions/userAction";

const ManagePermission = () => {
  const [role, setrole] = useState("");
  const [succmsg, setsuccmsg] = useState(false);
  const [ctadd, setctadd] = useState(false);
  const [ctupdate, setctupdate] = useState(false);
  const [ctdelete, setctdelete] = useState(false);
  const [sbctadd, setsbctadd] = useState(false);
  const [sbctupdate, setsbctupdate] = useState(false);
  const [sbctdelete, setsbctdelete] = useState(false);
  const [mfradd, setmfradd] = useState(false);
  const [mfrupdate, setmfrupdate] = useState(false);
  const [mfrdelete, setmfrdelete] = useState(false);
  const [prdctadd, setprdctadd] = useState(false);
  const [prdctupdate, setprdctupdate] = useState(false);
  const [prdctdelete, setprdctdelete] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userdl = useSelector((state) => state.userLogin);
  const { userInfo } = userdl;

  const userdetails = useSelector((state) => state.userDetails);
  const { user } = userdetails;

  const Update = async () => {
    const { data } = await axios.put(
      `http://localhost:5000/api/roles/${role}`,
      {
        ctadd,
        ctupdate,
        ctdelete,
        sbctadd,
        sbctupdate,
        sbctdelete,
        mfradd,
        mfrupdate,
        mfrdelete,
        prdctadd,
        prdctupdate,
        prdctdelete,
      }
    );

    if (data.message) {
      setsuccmsg(true);
      dispatch({ type: USER_DETAILS_RESET });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsuccmsg(false);
  };

  useEffect(async () => {
    await dispatch(getUserDetails("profile"));
    if (userInfo.role.name !== "super admin") {
      navigate("/dashboard");
    }
    if (user.role.name !== "super admin") {
      navigate("/dashboard");
    }
    if (role !== "") {
      const { data } = await axios.get(
        `http://localhost:5000/api/roles/${role}`
      );
      setctadd(data.ctadd);
      setctupdate(data.ctupdate);
      setctdelete(data.ctdelete);
      setsbctadd(data.sbctadd);
      setsbctupdate(data.sbctupdate);
      setsbctdelete(data.sbctdelete);
      setprdctadd(data.prdctadd);
      setprdctupdate(data.prdctupdate);
      setprdctdelete(data.prdctdelete);
      setmfradd(data.mfradd);
      setmfrupdate(data.mfrupdate);
      setmfrdelete(data.mfrdelete);
    } else {
      setctadd(false);
      setctupdate(false);
      setctdelete(false);
      setsbctadd(false);
      setsbctupdate(false);
      setsbctdelete(false);
      setprdctadd(false);
      setprdctupdate(false);
      setprdctdelete(false);
      setmfradd(false);
      setmfrupdate(false);
      setmfrdelete(false);
    }
  }, [userInfo, role]);

  return (
    <>
      <DashboardSidebar>
        <div className="d-flex  my-4">
          <h1 className="text-dark">Manage Permissions</h1>
        </div>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={succmsg}
          onClose={handleClose}
          autoHideDuration={2500}
        >
          <Alert
            severity="success"
            onClose={handleClose}
            autoHideDuration={2500}
            sx={{ width: "100%" }}
          >
            Permissions updated successfully
          </Alert>
        </Snackbar>

        <Form.Group className="mb-3">
          <Form.Label>
            Role <span className="required">*</span>
          </Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => {
              setrole(e.target.value);
            }}
          >
            <option value="">select Role</option>
            <option value="super admin">super admin</option>
            <option value="admin">admin</option>
            <option value="guest">guest</option>
            <option value="customized">customized</option>
          </Form.Control>
        </Form.Group>

        <Table striped bordered hover style={{ width: "100%" }} responsive>
          <thead>
            <tr>
              <th style={{ width: "40%" }}>#</th>
              <th style={{ width: "20%" }}>Add</th>
              <th style={{ width: "20%" }}> Update</th>
              <th style={{ width: "20%" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Category</td>
              <td>
                <Form.Check
                  inline
                  id="ctadd"
                  checked={ctadd}
                  onChange={() => setctadd(ctadd ? false : true)}
                />
              </td>
              <td>
                <Form.Check
                  inline
                  id="ctupdate"
                  checked={ctupdate}
                  onChange={() => setctupdate(ctupdate ? false : true)}
                />
              </td>
              <td>
                <Form.Check
                  inline
                  id="ctdelete"
                  checked={ctdelete}
                  onChange={() => setctdelete(ctdelete ? false : true)}
                />
              </td>
            </tr>
            <tr>
              <td>Sub Category</td>
              <td>
                <Form.Check
                  inline
                  id="sbctadd"
                  checked={sbctadd}
                  onChange={() => setsbctadd(sbctadd ? false : true)}
                />
              </td>
              <td>
                <Form.Check
                  inline
                  id="sbctupdate"
                  checked={sbctupdate}
                  onChange={() => setsbctupdate(sbctupdate ? false : true)}
                />
              </td>
              <td>
                <Form.Check
                  inline
                  id="sbctdelete"
                  checked={sbctdelete}
                  onChange={() => setsbctdelete(sbctdelete ? false : true)}
                />
              </td>
            </tr>
            <tr>
              <td>Manifacturer</td>
              <td>
                <Form.Check
                  inline
                  id="mfradd"
                  checked={mfradd}
                  onChange={() => setmfradd(mfradd ? false : true)}
                />
              </td>
              <td>
                <Form.Check
                  inline
                  id="mfrupdate"
                  checked={mfrupdate}
                  onChange={() => setmfrupdate(mfrupdate ? false : true)}
                />
              </td>
              <td>
                <Form.Check
                  inline
                  id="mfrdelete"
                  checked={mfrdelete}
                  onChange={() => setmfrdelete(mfrdelete ? false : true)}
                />
              </td>
            </tr>
            <tr>
              <td>Product</td>
              <td>
                <Form.Check
                  inline
                  id="prdctadd"
                  checked={prdctadd}
                  onChange={() => setprdctadd(prdctadd ? false : true)}
                />
              </td>
              <td>
                <Form.Check
                  inline
                  id="prdctupdate"
                  checked={prdctupdate}
                  onChange={() => setprdctupdate(prdctupdate ? false : true)}
                />
              </td>
              <td>
                <Form.Check
                  inline
                  id="prdctdelete"
                  checked={prdctdelete}
                  onChange={() => setprdctdelete(prdctdelete ? false : true)}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <button
          className="btn btn-primary"
          onClick={Update}
          disabled={role === ""}
        >
          Update Permissions
        </button>
      </DashboardSidebar>
    </>
  );
};

export default ManagePermission;
