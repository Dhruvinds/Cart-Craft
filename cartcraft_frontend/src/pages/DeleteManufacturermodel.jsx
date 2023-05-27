import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteManufacturer,
  listManufacturers,
} from "../Actions/manufacturerActions";

const DeleteManufacturermodel = ({ open, setopen, manufacturer }) => {
  const dispatch = useDispatch();

  async function deleteManufacture() {
    await dispatch(deleteManufacturer(manufacturer.id));
    await dispatch(listManufacturers());
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
            Are you sure you want to delete <b>{manufacturer.name}</b>{" "}
            manufacturer?
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
              deleteManufacture();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteManufacturermodel;
