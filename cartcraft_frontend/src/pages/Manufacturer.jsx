import React, { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  listManufacturers,
  deleteManufacturer,
} from "../Actions/manufacturerActions";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ManufacturerModel from "./ManufacturerModel";
import DeleteManufacturermodel from "./DeleteManufacturermodel";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { getUserDetails } from "../Actions/userAction";

const Manufacturer = () => {
  const [list, setList] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  const [pageSize, setPageSize] = useState(10);

  const [manufacturer1, setmanufacturer1] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setopen] = useState(false);
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  const manufacturer = useSelector((state) => state.manufacturerList);
  const { manufacturers } = manufacturer;

  const userdl = useSelector((state) => state.userDetails);
  const { user } = userdl;

  const mn = useSelector((state) => state.manufacturerAdd);
  const { success, createerror, error } = mn;

  const admn = useSelector((state) => state.manufacturerUpdate);
  const { updsucc, upderr, updateerror } = admn;

  const delmn = useSelector((state) => state.manufacturerDelete);
  const { delsucc, delerr, deleteerror } = delmn;

  async function handleClickDelete(event, cellValues) {
    setopen(true);
    setmanufacturer1(cellValues.row);
  }

  function handleClickUpdate(event, cellValues) {
    setType("update");
    setmanufacturer1(cellValues.row);
    setModalOpen(true);
  }

  function add() {
    setType("add");
    setModalOpen(true);
  }

  const rowsBeforeMapping = manufacturers;

  const rows = rowsBeforeMapping.map((row) => {
    const { _id, ...rest } = row;
    return { id: _id, ...rest };
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "name",
      headerName: "Manufacturer Name",
      width: 200,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "location",
      headerName: "Location",
      width: 160,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 170,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "description",
      headerName: "Description",
      width: 230,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "Update",
      renderCell: (cellValues) => {
        return (
          <Tooltip title="Update " placement="left" arrow>
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
      field: "Delete",
      renderCell: (cellValues) => {
        return (
          <Tooltip title="Delete " placement="left" arrow>
            <button
              className="btn btn-outline-danger"
              onClick={(event) => {
                handleClickDelete(event, cellValues);
              }}
            >
              <i className="fa-solid fa-trash-can"></i>
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

  async function delall() {
    const ids = selectedRows.map((e) => {
      return e.id;
    });

    if (window.confirm("Are you sure! ?")) {
      if (user.role.permissions[0].mfrdelete) {
        const { data } = await axios.delete(
          `http://localhost:5000/api/manufacturers/${ids}`
        );
        dispatch(listManufacturers());
      }
    }
  }

  useEffect(async () => {
    await dispatch(getUserDetails("profile"));
    dispatch(listManufacturers());
    setList(manufacturers);
  }, [dispatch]);

  return (
    <>
      <DashboardSidebar>
        <div className="d-flex  my-4">
          <h1 className="text-dark">Manufacturer</h1>
          <Tooltip title="Add Manufacturer" placement="bottom" arrow>
            <button
              className="btn btn-outline-success ms-auto mx-2"
              onClick={add}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </Tooltip>
          &nbsp; &nbsp; &nbsp;
          <Tooltip title="Delete Selected" placement="bottom" arrow>
            <button
              className="btn btn-outline-danger me-4"
              disabled={selectedRows.length === 0}
              onClick={delall}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </Tooltip>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={success}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert
            severity="success"
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            Manufacturer added successfully
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={updsucc}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert
            severity="success"
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            Manufacturer Updated successfully
          </Alert>
        </Snackbar>
        {createerror && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={createerror}
            onClose={handleClose}
            autoHideDuration={4000}
          >
            <Alert
              severity="error"
              onClose={handleClose}
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}
        {delsucc && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={delsucc}
            onClose={handleClose}
            autoHideDuration={4000}
          >
            <Alert severity="info" onClose={handleClose} sx={{ width: "100%" }}>
              Manufacturer deleted successfully
            </Alert>
          </Snackbar>
        )}
        {deleteerror && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={deleteerror}
            onClose={handleClose}
            autoHideDuration={4000}
          >
            <Alert
              severity="error"
              onClose={handleClose}
              sx={{ width: "100%" }}
            >
              {delerr}
            </Alert>
          </Snackbar>
        )}

        {updateerror && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={updateerror}
            onClose={handleClose}
            autoHideDuration={4000}
          >
            <Alert
              severity="error"
              onClose={handleClose}
              sx={{ width: "100%" }}
            >
              {upderr}
            </Alert>
          </Snackbar>
        )}

        <div style={{ height: 520, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
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
      </DashboardSidebar>
      <ManufacturerModel
        type={type}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        manufacturer={manufacturer1}
      />
      <DeleteManufacturermodel
        open={open}
        setopen={setopen}
        manufacturer={manufacturer1}
      />
    </>
  );
};

export default Manufacturer;
