import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { alluserslist } from "../Actions/userlistActions";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DashboardSidebar from "./DashboardSidebar";
import "../styles/muidatagrid.css";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
import RoleUpdateModel from "./RoleUpdateModel";
import { getUserDetails } from "../Actions/userAction";

const UserList = () => {
  const [pageSize, setPageSize] = useState(10);

  const [open, setopen] = useState(false);
  const [userdl, setuserdl] = useState("");

  const userlogin = useSelector((state) => state.userLogin);
  const { userInfo } = userlogin;

  const users = useSelector((state) => state.usersList);
  const { userslist } = users;

  const userdetails = useSelector((state) => state.userDetails);
  const { user } = userdetails;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rowsBeforeMapping = userslist;

  const rows =
    rowsBeforeMapping &&
    rowsBeforeMapping.map((row) => {
      const { _id, role, firstName, lastName, ...rest } = row;
      return {
        id: _id,
        role: role.name,
        fullname: firstName + " " + lastName,
        ...rest,
      };
    });

  function handleClickUpdate(event, cellValues) {
    setuserdl(cellValues.row);
    setopen(true);
  }

  const columns = [
    {
      field: "email",
      headerName: "Email",
      width: 400,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "fullname",
      headerName: "Name",
      width: 340,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "role",
      headerName: "Role",
      width: 340,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "Update",
      renderCell: (cellValues) => {
        return (
          <Tooltip title="Update" placement="left" arrow>
            <button
              className="btn btn-outline-secondary"
              onClick={(event) => {
                handleClickUpdate(event, cellValues);
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </Tooltip>
        );
      },
      align: "left",
      width: 128,
      headerAlign: "left",
    },
    {
      field: "Delete",
      renderCell: (cellValues) => {
        return (
          // <Tooltip title="Delete" placement="left" arrow>
          <button
            className="btn btn-outline-danger"
            // onClick={(event) => {
            //   handleClickDelete(event, cellValues);
            // }}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
          // </Tooltip>
        );
      },
      align: "left",
      width: 128,
      headerAlign: "left",
    },
  ];

  useEffect(async () => {
    await dispatch(getUserDetails("profile"));
    if (userInfo.role.name !== "super admin") {
      navigate("/dashboard");
    }
    if (user.role.name !== "super admin") {
      navigate("/dashboard");
    }
    dispatch(alluserslist());
  }, [userInfo, dispatch]);

  return (
    <>
      <DashboardSidebar>
        <div className="d-flex  my-4">
          <h1 className="text-dark">UserList</h1>
        </div>
        <div style={{ height: 520, width: "100%" }}>
          <DataGrid
            disableSelectionOnClick
            rows={rows}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            rowCount={500}
            checkboxSelection
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = rows.filter((row) =>
                selectedIDs.has(row.id)
              );

              // setSelectedRows(selectedRows);
            }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20]}
            pagination
          />
        </div>
      </DashboardSidebar>
      <RoleUpdateModel open={open} setopen={setopen} user={userdl} />
    </>
  );
};

export default UserList;
