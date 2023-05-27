import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DashboardSidebar from "./DashboardSidebar";
import Tooltip from "@mui/material/Tooltip";
import { deleteProduct, listproducts } from "../Actions/productsActions";
import DeleteProductmodel from "./DeleteProductmodel";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { getUserDetails } from "../Actions/userAction";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const [product1, setproduct1] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setopen] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const [deletemany, setdeletemany] = useState(false);

  const pl = useSelector((state) => state.productList);
  const { products } = pl;

  const userdl = useSelector((state) => state.userDetails);
  const { user } = userdl;

  const delpd = useSelector((state) => state.productDelete);
  const { delsucc, delerr, deleteerror } = delpd;

  async function handleClickDelete(event, cellValues) {
    setopen(true);
    setproduct1(cellValues.row);
  }

  const rowsBeforeMapping = products;
  const rows = rowsBeforeMapping.map((row) => {
    const { _id, category, subcategory, manufacture, image, ...rest } = row;
    return {
      id: _id,
      image: image[0],
      category: category.name,
      subcategory: subcategory.name,
      manufacture: manufacture.name,
      ...rest,
    };
  });

  const columns = [
    {
      field: "image",
      renderCell: (cellValues) => {
        return (
          <img
            className="rounded img-fluid "
            src={cellValues.row.image}
            height="100%"
            width="100%"
          />
        );
      },

      align: "left",
      headerAlign: "left",
    },
    {
      field: "category",
      headerName: "Category",
      width: 115,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "subcategory",
      headerName: "Subcategory",
      width: 120,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "manufacture",
      headerName: "Manufacture",
      width: 120,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "productname",
      headerName: "Name",
      width: 140,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "model",
      headerName: "Model",
      width: 130,
      align: "left",
      headerAlign: "left",
    },
    // {
    //   field: "Description",
    //   renderCell: (cellValues) => {
    //     return (
    //       <div
    //         dangerouslySetInnerHTML={{ __html: cellValues.row.description }}
    //       ></div>
    //     );
    //   },
    //   width: 500,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "prize",
      headerName: "Prize",
      width: 100,
      align: "left",
      headerAlign: "left",
    },

    {
      field: "qty",
      headerName: "Product Quantity",
      width: 130,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "location",
      headerName: "Location",
      width: 130,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "Update",
      renderCell: (cellValues) => {
        return (
          <Tooltip title="Update" placement="left" arrow>
            <Link to={`/editproduct/${cellValues.row.id}`}>
              <button className="btn btn-outline-secondary">
                <i className="fa-solid fa-pen-to-square "></i>
              </button>
            </Link>
          </Tooltip>
        );
      },
      align: "left",
      headerAlign: "left",
      width: 80,
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
      width: 80,
      align: "left",
      headerAlign: "left",
    },
  ];

  useEffect(async () => {
    await dispatch(getUserDetails("profile"));
    dispatch(listproducts());
  }, [dispatch]);

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
      if (user.role.permissions[0].prdctdelete) {
        const { data } = await axios.delete(
          `http://localhost:5000/api/products/deletemany/${ids}`
        );

        if (data.message) {
          setdeletemany(true);
        }
        dispatch(listproducts());

        setTimeout(() => {
          setdeletemany(false);
        }, 2000);
      }
    }
  }

  return (
    <>
      <DashboardSidebar>
        <div className="d-flex  my-4">
          <h1 className="text-dark">Products</h1>
          <Tooltip title="Add Product" placement="bottom" arrow>
            <button
              className="btn btn-outline-success ms-auto mx-2"
              onClick={() => {
                navigate("/addproduct");
              }}
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
          open={deletemany}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert severity="info" onClose={handleClose} sx={{ width: "100%" }}>
            Products Successfully Deleted
          </Alert>
        </Snackbar>
        {delsucc && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={delsucc}
            onClose={handleClose}
            autoHideDuration={4000}
          >
            <Alert severity="info" onClose={handleClose} sx={{ width: "100%" }}>
              Product Successfully Deleted
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
      <DeleteProductmodel
        open={open}
        setopen={setopen}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={product1}
      />
    </>
  );
};

export default Products;
