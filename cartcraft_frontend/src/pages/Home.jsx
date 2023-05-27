import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./UserDashboard";
import { listproducts } from "../Actions/productsActions";
import { listCategories } from "../Actions/categoriesActions";
import { listSubCategories } from "../Actions/subcategoriesAction";
import { listManufacturers } from "../Actions/manufacturerActions";
import "../styles/dropdown.css";
import "../styles/home.css";
import { getUserDetails } from "../Actions/userAction";
import Card from "./card";
import Footer from "../components/Footer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { Form } from "react-bootstrap";

const Home = () => {
  const ctlist = useSelector((state) => state.categoriesList);
  const { categories } = ctlist;

  const subctlist = useSelector((state) => state.subCategoriesList);
  const { subcategory: subcategories } = subctlist;

  const pl = useSelector((state) => state.productList);
  const { products } = pl;

  const manufacturer = useSelector((state) => state.manufacturerList);
  const { manufacturers } = manufacturer;

  const [ascsort, setascsort] = useState(false);
  const [desort, setdesort] = useState(false);
  const [checked, setChecked] = useState(false);

  const [items, setItems] = useState(
    products.sort((a, b) => {
      if (ascsort) {
        return a.prize < b.prize ? -1 : a.prize > b.prize ? 1 : 0;
      } else if (desort) {
        return b.prize - a.prize;
      } else {
        return products;
      }
    })
  );

  const filterResult = (subcat) => {
    const result = products.filter((curData) => {
      return curData.subcategory.name === subcat;
    });
    setItems(result);
  };

  const dispatch = useDispatch();

  const wishitem = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishitem;

  const [val, setval] = useState("");
  const [text, settext] = useState("");

  const handle = (manuf) => {
    const result = products.filter((curData) => {
      return curData.manufacture.name === manuf;
    });

    setItems(result);
  };

  const handleChange = async (event) => {
    setval(event.target.value);

    if (event.target.value === "Low to High") {
      setdesort(false);
      setascsort(true);
      if (items.length > 0) {
        items.sort((a, b) => {
          return a.prize - b.prize;
        });
      }
    } else {
      if (items.length > 0) {
        items.sort((a, b) => {
          return b.prize - a.prize;
        });
        setItems(items);
      }
      setascsort(false);
      setdesort(true);
    }
  };

  const handleOne = (event) => {
    setChecked(event.target.checked);
    const result = products.filter((curData) => {
      if (curData.prize <= 50) {
        return curData.prize;
      }
    });
    setItems(result);
  };

  const handleTwo = (event) => {
    setChecked(event.target.checked);
    const result = products.filter((curData) => {
      if (curData.prize >= 51 && curData.prize <= 1000) {
        return curData.prize;
      }
    });
    setItems(result);
  };

  const handleThree = (event) => {
    setChecked(event.target.checked);
    const result = products.filter((curData) => {
      if (curData.prize >= 1001 && curData.prize <= 1100) {
        return curData.prize;
      }
    });
    setItems(result);
  };

  const handleFour = (event) => {
    setChecked(event.target.checked);
    const result = products.filter((curData) => {
      if (curData.prize > 1100) {
        return curData.prize;
      }
    });
    setItems(result);
  };

  useEffect(async () => {
    await dispatch(listCategories());
    await dispatch(listSubCategories());
    await dispatch(listproducts());
    await dispatch(listManufacturers());
    await dispatch(getUserDetails("profile"));
  }, [dispatch]);

  return (
    <Fragment>
      <div className="flex-grow">
        <Navbar />
      </div>

      <div className="row mb-2 py-2 ">
        <div className="col-2"></div>
        <div className="col-2" style={{ backgroundColor: "#e9ecef" }}>
          <div className="mt-2 mr-5">
            <Form>
              <Form.Group className="mb-3">
                <Form.Select
                  style={{
                    height: "56px",
                    background: "transparent",
                    border: "dotted grey 0.5px",
                  }}
                  onChange={(e) => {
                    handle(e.target.value);
                  }}
                >
                  <option value="">Select Brand </option>
                  {manufacturers.map((x) => {
                    return (
                      <option value={x.name}>
                        {x.name.charAt(0).toUpperCase() + x.name.slice(1)}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="col-6 py-2" style={{ backgroundColor: "#e9ecef" }}>
          <TextField
            id="outlined-basic"
            label="Search By Name"
            variant="outlined"
            fullWidth
            value={text}
            onChange={(e) => {
              settext(e.target.value);
              var res = products.filter((abc) => {
                if (
                  abc.productname
                    .toLowerCase()
                    .indexOf(e.target.value.toLowerCase()) > -1
                ) {
                  return true;
                }
              });
              if (res.length > 0) {
                setItems(res);
              } else {
                setItems([
                  {
                    image: ["../../images/nodata.svg"],
                    productname: "Not Found",
                    category: { name: "" },
                  },
                ]);
              }
            }}
          />
        </div>
        <div className="col-2" style={{ backgroundColor: "#e9ecef" }}>
          <div className="mt-2 mr-5" style={{ paddingLeft: " 10%" }}>
            <FormControl style={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">price</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={val}
                label="price"
                onChange={handleChange}
              >
                <MenuItem value="Low to High">Low to High</MenuItem>
                <MenuItem value="High to Low">High to Low</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-2" style={{ marginTop: "20px" }}>
          <div class="vertical-nav bg-white ml-3" id="sidebar">
            <button
              className="dropbtn"
              style={{ marginLeft: "8px", fontWeight: "bolder" }}
              onClick={() => setItems(products)}
            >
              All
            </button>

            <ul className="list-unstyled mb-0 py-3 pt-md-1">
              {categories.length === 0
                ? []
                : categories.map((x) => {
                    return (
                      <>
                        <li>
                          <button
                            class="btn d-inline-flex align-items-center rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${
                              x.name.charAt(0).toUpperCase() + x.name.slice(1)
                            }-collapse`}
                            aria-expanded="false"
                          >
                            <b>
                              {x.name.charAt(0).toUpperCase() + x.name.slice(1)}
                            </b>
                          </button>

                          {x.subcategory.map((a) => {
                            return (
                              <>
                                <div
                                  class="collapse"
                                  id={`${
                                    x.name.charAt(0).toUpperCase() +
                                    x.name.slice(1)
                                  }-collapse`}
                                >
                                  <ul class="list-unstyled fw-normal pb-1 small pt-2 px-3">
                                    <li>
                                      <a
                                        onClick={() => {
                                          filterResult(a.name);
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        {a.name.charAt(0).toUpperCase() +
                                          a.name.slice(1)}
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </>
                            );
                          })}
                        </li>
                      </>
                    );
                  })}
            </ul>

            <button
              className="dropbtn"
              // style={{ marginLeft: "135px" }}
              style={{
                marginLeft: "8px",
                fontWeight: "bolder",
              }}
              onClick={() => setItems(products)}
            >
              Price
            </button>
            <ul class="list-unstyled my-1  py-3 pt-md-1">
              <li>
                <input
                  type="radio"
                  id="one"
                  style={{ marginLeft: "8px", fontWeight: "bolder" }}
                  class="form-check-input"
                  value="one"
                  onClick={handleOne}
                  name="one"
                />
                <b style={{ marginLeft: "8px" }}>less then $50</b>
                <br></br>
                <input
                  type="radio"
                  id="two"
                  style={{ marginLeft: "8px", fontWeight: "bolder" }}
                  class="form-check-input"
                  value="two"
                  onChange={handleTwo}
                  name="one"
                />
                <b style={{ marginLeft: "8px" }}>$51 to $1000</b>
                <br></br>
                <input
                  type="radio"
                  id="three"
                  style={{ marginLeft: "8px", fontWeight: "bolder" }}
                  class="form-check-input"
                  value="three"
                  onChange={handleThree}
                  name="one"
                />
                <b style={{ marginLeft: "8px" }}>$1001 to $1100</b>
                <br></br>
                <input
                  type="radio"
                  id="four"
                  style={{ marginLeft: "8px", fontWeight: "bolder" }}
                  class="form-check-input"
                  value="four"
                  onClick={handleFour}
                  name="one"
                />
                <b style={{ marginLeft: "8px" }}>$1100- To above</b>
                <br></br>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-10">
          <div className="row">
            {items.length !== 0
              ? items.map((product) => {
                  return (
                    <>
                      <div className="col-lg-3 col-md-4 col-sm-6 h-auto">
                        <Card
                          product={product}
                          icon={wishlistItems.find((x) => {
                            if (x.product === product._id) {
                              return true;
                            } else {
                              return false;
                            }
                          })}
                        />
                      </div>
                    </>
                  );
                })
              : products.map((product) => {
                  return (
                    <>
                      <div className="col-lg-3 col-md-4 col-sm-6 h-auto">
                        <Card product={product} />
                      </div>
                    </>
                  );
                })}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Home;
