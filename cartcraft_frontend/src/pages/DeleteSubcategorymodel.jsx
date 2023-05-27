import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteSubCategory,
  listSubCategories,
} from "../Actions/subcategoriesAction";

const DeleteSubcategorymodel = ({ open, setopen, subcategory }) => {
  const dispatch = useDispatch();

  async function deletesubcategory() {
    await dispatch(deleteSubCategory(subcategory.id));
    await dispatch(listSubCategories());
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
            Are you sure you want to delete <b>{subcategory.name}</b>{" "}
            subcategory?
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
              deletesubcategory();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteSubcategorymodel;
