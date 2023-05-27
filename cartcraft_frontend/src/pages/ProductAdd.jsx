import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DashboardSidebar from "./DashboardSidebar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listCategories } from "../Actions/categoriesActions";
import { listSubCategories } from "../Actions/subcategoriesAction";
import { listManufacturers } from "../Actions/manufacturerActions";
import { addProduct } from "../Actions/productsActions";
import { Form } from "react-bootstrap";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/product.css";

const ProductAdd = () => {
  const [category, setcategory] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [manifacturer, setmanifacturer] = useState("");

  const [sblist, setsblist] = useState([]);
  const [uploading, setUploading] = useState(false);

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

  const ctlist = useSelector((state) => state.categoriesList);
  const { categories } = ctlist;

  const subctlist = useSelector((state) => state.subCategoriesList);
  const { subcategory: subcategories } = subctlist;

  const mnlist = useSelector((state) => state.manufacturerList);
  const { manufacturers } = mnlist;

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

      const { data } = await axios.post(
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
      category === "" ||
      subcategory === "" ||
      manifacturer === "" ||
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
        addProduct(
          category,
          subcategory,
          manifacturer,
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

  const ctchange = async (e) => {
    const cat = e.target.value;
    const data = subcategories.filter((e) => e.category.name === cat);
    await setcategory(e.target.value);
    setsubcategory("");

    setsblist(data);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setvalidate(false);
  };

  useEffect(async () => {
    await dispatch(listCategories());
    await dispatch(listSubCategories());
    await dispatch(listManufacturers());
  }, [dispatch]);

  return (
    <>
      <DashboardSidebar>
        <h1 className="my-4">ADD PRODUCT</h1>

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
                <Tab label="General" value="1" />
                <Tab label="Data" value="2" />
                <Tab label="Image" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Form.Group className="mb-3">
                <Form.Label>
                  Category <span className="required">*</span>
                </Form.Label>
                <Form.Control as="select" value={category} onChange={ctchange}>
                  <option value="">select category</option>
                  {categories.length === 0
                    ? []
                    : categories.map((x) => {
                        return (
                          <option key={x._id} value={x.name}>
                            {x.name}
                          </option>
                        );
                      })}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Sub category <span className="required">*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={subcategory}
                  onChange={(e) => setsubcategory(e.target.value)}
                >
                  <option value="">select Subcategory</option>
                  {sblist.length === 0
                    ? []
                    : sblist.map((x) => {
                        return (
                          <option key={x._id} value={x.name}>
                            {x.name}
                          </option>
                        );
                      })}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Manifacturer <span className="required">*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={manifacturer}
                  onChange={(e) => setmanifacturer(e.target.value)}
                >
                  <option value="">select Manufacturer</option>
                  {manufacturers.length === 0
                    ? []
                    : manufacturers.map((x) => {
                        return (
                          <option key={x._id} value={x.name}>
                            {x.name}
                          </option>
                        );
                      })}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicproductname">
                <Form.Label>
                  Product Name <span className="required">*</span>
                </Form.Label>
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
                <Form.Label>
                  Description <span className="required">*</span>
                </Form.Label>
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
                <Form.Label>
                  Model <span className="required">*</span>
                </Form.Label>
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
                <Form.Label>
                  UPC <span className="required">*</span>
                </Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Enter UPC (ex:- 9753641XXX)"
                  value={upc}
                  onChange={(e) => {
                    setupc(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasiclocation">
                <Form.Label>
                  Location <span className="required">*</span>
                </Form.Label>
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
                <Form.Label>
                  Prize <span className="required">*</span>
                </Form.Label>
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
                <Form.Label>
                  Product Quntity <span className="required">*</span>{" "}
                </Form.Label>
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
                <Form.Label>
                  Status <span className="required">*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setstatus(e.target.value)}
                >
                  {qty > 0 ? (
                    <>
                      <option value="">select Status</option>
                      <option value="in stock">In Stock</option>
                      <option value="pre order">Pre order</option>
                      <option value="2-3 days">2-3 Days</option>
                    </>
                  ) : (
                    <>
                      <option value="">select Status</option>
                      <option value="out of stock">Out of Stock</option>
                      <option value="pre order">Pre order</option>
                      <option value="2-3 days">2-3 Days</option>
                    </>
                  )}
                </Form.Control>
              </Form.Group>
            </TabPanel>
            <TabPanel value="3">
              <Form.Group controlId="image">
                <Form.Label>
                  Image <span className="required">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  readOnly
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
                Add Product
              </button>
            </TabPanel>
          </TabContext>
        </Box>
      </DashboardSidebar>
    </>
  );
};

export default ProductAdd;
