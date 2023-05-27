import React, { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../styles/muidatagrid.css";
import { listallOrders } from "../Actions/allordersActions";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

import Tooltip from "@mui/material/Tooltip";
import Orderstatusmodel from "./Orderstatusmodel";

const AllOrder = () => {
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setopen] = useState(false);
  const [order, setorder] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alltheorder = useSelector((state) => state.allorderList);
  const { allorders } = alltheorder;
  const orderUp = useSelector((state) => state.orderUpdate);
  const { success } = orderUp;

  const rowsBeforeMapping = allorders;

  const rows = rowsBeforeMapping.map((row) => {
    const { _id, user, ...rest } = row;
    return { id: _id, user: user.firstName + "" + user.lastName, ...rest };
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "user",
      headerName: "Full name",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "paidAt",
      headerName: "Time & Date",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
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
      headerAlign: "left",
    },
    {
      field: "Details",
      renderCell: (cellValues) => {
        return (
          <Tooltip title="Order details" placement="left" arrow>
            <button
              className="btn btn-outline-success"
              onClick={() => {
                navigate(`/orderadmin/${cellValues.row.id}`);
              }}
              style={{ width: "42px" }}
            >
              <i class="fa-solid fa-info"></i>
            </button>
          </Tooltip>
        );
      },
      align: "left",
      headerAlign: "left",
    },
  ];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  function handleClickUpdate(event, val) {
    setorder(val.row);
    setopen(true);
  }

  useEffect(async () => {
    await dispatch(listallOrders());
  }, [dispatch]);

  return (
    <>
      <DashboardSidebar>
        {success && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={success}
            onClose={handleClose}
            autoHideDuration={4000}
          >
            <Alert severity="info" onClose={handleClose} sx={{ width: "100%" }}>
              Order Status Updated Successfully
            </Alert>
          </Snackbar>
        )}
        <div className="d-flex  my-4">
          <h1 className="text-dark">All Orders</h1>
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

              setSelectedRows(selectedRows);
            }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20]}
            pagination
          />
        </div>
        <Orderstatusmodel
          modalOpen={open}
          setModalOpen={setopen}
          order={order}
        />
      </DashboardSidebar>
    </>
  );
};

export default AllOrder;
