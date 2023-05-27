import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteCategory, listCategories } from "../Actions/categoriesActions";

const DeleteCategorymodel = ({ open, setopen, category }) => {
  const dispatch = useDispatch();

  async function deletecategory() {
    await dispatch(deleteCategory(category.id));
    await dispatch(listCategories());
    setopen(false);
  }

  return (
    <>
      <Modal
        show={open}
        onHide={() => {
          setopen(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you sure you want to delete <b>{category.name}</b> category?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setopen(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deletecategory();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteCategorymodel;
