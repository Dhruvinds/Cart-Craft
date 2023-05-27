import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/product.css";

import {
  listSubCategories,
  addSubcategory,
  updateSubategory,
} from "../Actions/subcategoriesAction";

import { listCategories } from "../Actions/categoriesActions";

const SubcategoryModel = ({ type, modalOpen, setModalOpen, subcategory }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setcategoryName] = useState("");

  const [categoryList, setcategoryList] = useState([]);

  const [nameError, setNameError] = useState({ display: "none" });
  const [descError, setDescError] = useState({ display: "none" });
  const [ctError, setctError] = useState({ display: "none" });

  const dispatch = useDispatch();

  const ctlist = useSelector((state) => state.categoriesList);
  const { categories } = ctlist;

  useEffect(async () => {
    if (type === "update" && subcategory) {
      setName(subcategory.name);
      setDescription(subcategory.description);
      setcategoryName(subcategory.category);
    } else {
      setName("");
      setcategoryName();
      setDescription("");
    }

    await dispatch(listCategories());
    await setcategoryList(categories);
  }, [type, subcategory, modalOpen, dispatch]);

  async function submit(e) {
    e.preventDefault();

    var validateName = /^[aA-zZ, ]+$/.test(name);

    if (!validateName) {
      setNameError({ display: "block" });
      setTimeout(() => {
        setNameError({ display: "none" });
      }, 5000);
    } else if (description === "" || description == null) {
      setDescError({ display: "block" });
      setTimeout(() => {
        setDescError({ display: "none" });
      }, 5000);
    } else if (categoryName == " " || categoryName == null) {
      setctError({ display: "block" });
      setTimeout(() => {
        setctError({ display: "none" });
      }, 5000);
    } else {
      if (type === "update") {
        await dispatch(updateSubategory(subcategory.id, name, description));
        await dispatch(listSubCategories());
        setModalOpen(false);
      } else {
        await dispatch(addSubcategory(categoryName, name, description));
        await dispatch(listSubCategories());
        setModalOpen(false);
      }
    }
  }

  return (
    <>
      <Modal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {type == "add" ? "Add" : "Update"} SubCategory
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category  <span className="required">*</span></Form.Label>
              <Form.Control
                disabled={type === "update"}
                as="select"
                value={categoryName}
                onChange={(e) => setcategoryName(e.target.value)}
              >
                <option>Select category </option>
                {categoryList.map((x) => (
                  <option key={x._id} value={x.name}>
                    {x.name}
                  </option>
                ))}
              </Form.Control>
              <div
                style={ctError}
                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
              >
                Please Select Category
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name  <span className="required">*</span></Form.Label>
              <Form.Control
                type="Text"
                placeholder="Enter Subcategory name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div
                style={nameError}
                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
              >
                Please enter valid SubCategory Name ( Only characters are
                allowed )
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description  <span className="required">*</span></Form.Label>
              {/* <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              /> */}
              <ReactQuill
                theme="snow"
                value={description}
                style={{ height: "100px" }}
                onChange={setDescription}
              />

              <div
                style={descError}
                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
              >
                Please enter valid Description ( Only characters are allowed )
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => submit(e)}>
            {type == "add" ? "Add" : "Update"}
          </Button>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubcategoryModel;
