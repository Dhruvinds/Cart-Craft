import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DashboardSidebar from "./DashboardSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct, productdtlis } from "../Actions/productsActions";
import { PRODUCTS_UPDATE_RESET } from "../constants/productConstants";
import { Form } from "react-bootstrap";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditProduct = () => {
  const [uploading, setUploading] = useState(false);

  const [category, setcategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [manifacturer, setmanifacturer] = useState("");

  const [productname, setproductname] = useState("");
  const [description, setdescription] = useState("");
  const [model, setmodel] = useState("");
  const [upc, setupc] = useState("");
  const [location, setlocation] = useState("");
  const [prize, setprize] = useState("");
  const [status, setstatus] = useState("");
  const [image, setimage] = useState("");
  const [qty, setqty] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const pdupdate = useSelector((state) => state.productUpdate);
  const { success } = pdupdate;

  const prdct = useSelector((state) => state.productDetails);
  const { product } = prdct;

  const [value, setValue] = React.useState("1");
  const [validate, setvalidate] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function uploadFileHandler(e) {
    const file = e.target.files[0];
    const file1 = e.target.files[1];
    const file2 = e.target.files[2];
    const file3 = e.target.files[3];
    const file4 = e.target.files[4];

    const formData = new FormData();
    formData.append("image", file);
    formData.append("image", file1);
    formData.append("image", file2);
    formData.append("image", file3);
    formData.append("image", file4);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.put(
        "http://localhost:5000/api/upload",
        formData,
        config
      );

      setimage(data);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  }

  async function submit(e) {
    if (
      !productname ||
      !description ||
      !model ||
      !upc ||
      !location ||
      !prize ||
      !qty ||
      status === "" ||
      !image
    ) {
      setvalidate(true);
    } else {
      await dispatch(
        updateProduct(
          id,
          productname,
          description,
          model,
          upc,
          location,
          prize,
          qty,
          status,
          image
        )
      );

      navigate("/Products");
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setvalidate(false);
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCTS_UPDATE_RESET });
      navigate("/Products");
    } else {
      if (!product.productname || product._id !== id) {
        dispatch(productdtlis(id));
      } else {
        setcategory(product.category.name);
        setsubcategory(product.subcategory.name);
        setmanifacturer(product.manufacture.name);
        setproductname(product.productname);
        setdescription(product.description);
        setmodel(product.model);
        setupc(product.upc);
        setlocation(product.location);
        setprize(product.prize);
        setqty(product.qty);
        setstatus(product.status);
        setimage(product.image);
      }
    }
  }, [dispatch, navigate, id, product, success]);

  return (
    <>
      <DashboardSidebar>
        <h1 className="my-4">Edit PRODUCT</h1>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={validate}
          onClose={handleClose}
          autoHideDuration={4000}
        >
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            All fields are required
          </Alert>
        </Snackbar>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="general" value="1" />
                <Tab label="data" value="2" />
                <Tab label="image" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  className="cursor-not-allowed"
                  value={category}
                  readOnly
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>SubCategory</Form.Label>
                <Form.Control
                  className="cursor-not-allowed"
                  readOnly
                  type="text"
                  value={subcategory}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Manifacturer</Form.Label>
                <Form.Control
                  className="cursor-not-allowed"
                  readOnly
                  type="text"
                  value={manifacturer}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicproductname">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Enter product name"
                  value={productname}
                  onChange={(e) => {
                    setproductname(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicdescription">
                <Form.Label>Description</Form.Label>
                {/* <Form.Control
                  type="Text"
                  placeholder="Enter description about product"
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                /> */}
                <ReactQuill
                  theme="snow"
                  value={description}
                  style={{ height: "100px" }}
                  onChange={setdescription}
                />
              </Form.Group>
            </TabPanel>

            <TabPanel value="2">
              <Form.Group className="mb-3" controlId="formBasicmodel">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Enter product model"
                  value={model}
                  onChange={(e) => {
                    setmodel(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicupc">
                <Form.Label>UPC</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Enter upc"
                  value={upc}
                  onChange={(e) => {
                    setupc(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasiclocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Enter location for product"
                  value={location}
                  onChange={(e) => {
                    setlocation(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicprize">
                <Form.Label>Prize</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Enter product prize"
                  value={prize}
                  onChange={(e) => {
                    setprize(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicproductquntity">
                <Form.Label>Product Quntity</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Enter product quntity"
                  value={qty}
                  onChange={(e) => {
                    setqty(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setstatus(e.target.value)}
                >
                  {qty > 0 ? (
                    <>
                      <option value="">select Status</option>
                      <option value="In stock">In Stock</option>
                      <option value="Pre order">Pre order</option>
                      <option value="2-3 days">2-3 Days</option>
                    </>
                  ) : (
                    <>
                      <option value="">select Status</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Pre order">Pre order</option>
                      <option value="2-3 days">2-3 Days</option>
                    </>
                  )}
                </Form.Control>
              </Form.Group>
            </TabPanel>
            <TabPanel value="3">
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Selected Image"
                  value={image}
                  onChange={(e) => setimage(e.target.value)}
                ></Form.Control>
                <Form.Control
                  multiple
                  type="file"
                  id="image-file"
                  label="Choose File"
                  custom
                  onChange={uploadFileHandler}
                ></Form.Control>
              </Form.Group>

              <button className="btn btn-primary my-3" onClick={submit}>
                Update Product
              </button>
            </TabPanel>
          </TabContext>
        </Box>
      </DashboardSidebar>
    </>
  );
};

export default EditProduct;
