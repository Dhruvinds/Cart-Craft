import React, { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, listCategories } from "../Actions/categoriesActions";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getUserDetails } from "../Actions/userAction";
import CategoryModel from "./CategoryModel";
import "../styles/muidatagrid.css";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import DeleteCategorymodel from "./DeleteCategorymodel";

const Category = () => {
  const [list, setList] = useState([]);
  const [deletemany, setdeletemany] = useState(false);
  const [deletemanyerror, setdeletemanyerror] = useState(false);

  const [category1, setCategory1] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [open, setopen] = useState(false);
  const [type, setType] = useState("");

  const [pageSize, setPageSize] = useState(10);

  const dispatch = useDispatch();

  const category = useSelector((state) => state.categoriesList);
  const { categories } = category;

  const userdl = useSelector((state) => state.userDetails);
  const { user } = userdl;

  const ct = useSelector((state) => state.categoryUpdate);
  const { success, updaterror, error } = ct;

  const adct = useSelector((state) => state.categoryCreate);
  const { succ, err, createrror } = adct;

  const delct = useSelector((state) => state.categoryDelete);
  const { delsucc, delerr, deleteerror } = delct;

  async function handleClickDelete(event, cellValues) {
    setopen(true);
    setCategory1(cellValues.row);
  }

  function handleClickUpdate(event, cellValues) {
    setType("update");
    setCategory1(cellValues.row);
    setModalOpen(true);
  }

  function add() {
    setType("add");
    setModalOpen(true);
  }

  const rowsBeforeMapping = categories;

  const rows = rowsBeforeMapping.map((row) => {
    const { _id, ...rest } = row;
    return { id: _id, ...rest };
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 350,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   width: 500,
    //   align: "center",
    //   headerAlign: "center",
    // },
    {
      field: "Description",
      renderCell: (cellValues) => {
        return (
          <div
            dangerouslySetInnerHTML={{ __html: cellValues.row.description }}
          ></div>
        );
      },
      width: 500,
      headerAlign: "left",
      align: "left",
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
      field: "Delete",
      renderCell: (cellValues) => {
        return (
          <Tooltip title="Delete" placement="left" arrow>
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
  useEffect(async () => {
    await dispatch(getUserDetails("profile"));
    dispatch(listCategories());
    setList(categories);
  }, [dispatch]);

  async function delall() {
    const ids = selectedRows.map((e) => {
      return e.id;
    });

    if (window.confirm("Are you sure! ?")) {
      if (user.role.permissions[0].ctdelete) {
        const { data } = await axios.delete(
          `http://localhost:5000/api/categories/deletecategories/${ids}`
        );
        if (data.error) {
          setdeletemany(true);
        }
        dispatch(listCategories());

        setTimeout(() => {
          setdeletemany(false);
        }, 2000);
      } else {
        setdeletemanyerror(true);

        setTimeout(() => {
          setdeletemanyerror(false);
        }, 2000);
      }
    }
  }

  return (
    <>
      <DashboardSidebar>
        <div className="d-flex  my-4">
          <h1 className="text-dark">Categories</h1>
          <Tooltip title="Add Category" placement="bottom" arrow>
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
            Category updated successfully
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={succ}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert
            severity="success"
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            Category added successfully
          </Alert>
        </Snackbar>
        {createrror && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={createrror}
            onClose={handleClose}
            autoHideDuration={4000}
          >
            <Alert
              severity="error"
              onClose={handleClose}
              sx={{ width: "100%" }}
            >
              {err}
            </Alert>
          </Snackbar>
        )}
        {updaterror && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={updaterror}
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
              Category deleted successfully
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
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={deletemanyerror}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            You don't have permission
          </Alert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={deletemany}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            You can't delete Categories because it associated with Subcategories
          </Alert>
        </Snackbar>

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
      </DashboardSidebar>
      <CategoryModel
        type={type}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category1}
      />
      <DeleteCategorymodel open={open} setopen={setopen} category={category1} />
    </>
  );
};

export default Category;
