import React, { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  listSubCategories,
  deleteSubCategory,
} from "../Actions/subcategoriesAction";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import SubcategoryModel from "./SubcategoryModel";
import DeleteSubcategorymodel from "./DeleteSubcategorymodel";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import "../styles/muidatagrid.css";
import { getUserDetails } from "../Actions/userAction";

const SubCategory = () => {
  const [list, setList] = useState([]);

  const [Subcategory1, setSubcategory1] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setopen] = useState(false);
  const [type, setType] = useState("");

  const [selectedRows, setSelectedRows] = useState([]);

  const [pageSize, setPageSize] = useState(10);

  const [deletemany, setdeletemany] = useState(false);

  const dispatch = useDispatch();

  async function handleClickDelete(event, cellValues) {
    setopen(true);
    setSubcategory1(cellValues.row);
  }

  const userdl = useSelector((state) => state.userDetails);
  const { user } = userdl;

  const subctlist = useSelector((state) => state.subCategoriesList);
  const { subcategory } = subctlist;

  const subctupdate = useSelector((state) => state.subCategoryUpdate);
  const { success, updaterror, error } = subctupdate;

  const adsubct = useSelector((state) => state.subCategoryCreate);
  const { succ, err, createrror } = adsubct;

  const delsubct = useSelector((state) => state.subCategoryDelete);
  const { delsucc, delerr, deleteerror } = delsubct;

  function handleClickUpdate(event, cellValues) {
    setType("update");
    setSubcategory1(cellValues.row);
    setModalOpen(true);
  }

  function add() {
    setType("add");
    setModalOpen(true);
  }

  const rowsBeforeMapping = subcategory;

  const rows = rowsBeforeMapping.map((row) => {
    const { _id, category, ...rest } = row;
    return { id: _id, category: category.name, ...rest };
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 250,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "category",
      headerName: "Category Name",
      width: 200,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "name",
      headerName: "Subcategory Name",
      width: 200,
      align: "left",
      headerAlign: "left",
    },

    // {
    //   field: "description",
    //   headerName: "Description",
    //   width: 370,
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
      width: 450,
      headerAlign: "left",
      align: "left",
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
      if (user.role.permissions[0].sbctdelete) {
        const { data } = await axios.delete(
          `http://localhost:5000/api/subcategories/deletemany/${ids}`
        );

        if (data.error) {
          setdeletemany(true);
        }
        dispatch(listSubCategories());

        setTimeout(() => {
          setdeletemany(false);
        }, 2000);
      }
    }
  }

  useEffect(async () => {
    await dispatch(getUserDetails("profile"));
    dispatch(listSubCategories());
    setList(subcategory);
  }, [dispatch]);

  return (
    <>
      <DashboardSidebar>
        <div className="d-flex  my-4">
          <h1 className="text-dark">SubCategories</h1>
          <Tooltip title="Add SubCategory" placement="bottom" arrow>
            <button
              className="btn btn-outline-success ms-auto mx-2"
              onClick={add}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </Tooltip>
          &nbsp; &nbsp; &nbsp;
          <Tooltip title="Delete Selected SubCategory" placement="bottom" arrow>
            <button
              className="btn btn-outline-danger me-4"
              disabled={selectedRows.length === 0}
              onClick={delall}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </Tooltip>
        </div>

        {/* snack bars for messages */}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={success}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Subategory Updated Successfully
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={updaterror}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={succ}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Subategory added successfully
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

        {delsucc && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={delsucc}
            onClose={handleClose}
            autoHideDuration={4000}
          >
            <Alert severity="info" onClose={handleClose} sx={{ width: "100%" }}>
              Subcategory deleted successfully
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
          open={deletemany}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            You can't Delete Subategories because it associate with Products
          </Alert>
        </Snackbar>

        <div style={{ height: 550, width: "100%" }}>
          <DataGrid
            disableSelectionOnClick
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
      <SubcategoryModel
        type={type}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        subcategory={Subcategory1}
      />
      <DeleteSubcategorymodel
        open={open}
        setopen={setopen}
        subcategory={Subcategory1}
      />
    </>
  );
};

export default SubCategory;
