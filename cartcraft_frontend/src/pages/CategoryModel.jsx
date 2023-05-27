import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/product.css";

import {
  updateCategory,
  listCategories,
  createCategory,
} from "../Actions/categoriesActions";

const CategoryModel = ({ type, modalOpen, setModalOpen, category }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [nameError, setNameError] = useState({ display: "none" });
  const [descError, setDescNameError] = useState({ display: "none" });

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && category) {
      setName(category.name);
      setDescription(category.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [type, category, modalOpen]);

  async function submit(e) {
    e.preventDefault();
    var validateName = /^[aA-zZ, ]+$/.test(name);

    if (!validateName) {
      setNameError({ display: "block" });
      setTimeout(() => {
        setNameError({ display: "none" });
      }, 5000);
    } else if (description === "" || description == null) {
      setDescNameError({ display: "block" });
      setTimeout(() => {
        setDescNameError({ display: "none" });
      }, 5000);
    } else {
      if (type === "update") {
        await dispatch(updateCategory(category.id, name, description));
        await dispatch(listCategories());
        setModalOpen(false);
      } else {
        await dispatch(createCategory(name, description));
        await dispatch(listCategories());
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
          <Modal.Title>{type == "add" ? "Add" : "Update"} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Name <span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="Text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div
                style={nameError}
                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
              >
                Please enter valid Category name ( Only characters are allowed )
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                Description <span className="required">*</span>
              </Form.Label>
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

export default CategoryModel;
