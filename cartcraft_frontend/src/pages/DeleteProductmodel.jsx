import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteProduct, listproducts } from "../Actions/productsActions";

const DeleteProductmodel = ({ open, setopen, product }) => {
  const dispatch = useDispatch();

  async function deleteproduct() {
    await dispatch(deleteProduct(product.id));
    await dispatch(listproducts());
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
            Are you sure you want to delete <b>{product.productname}</b>{" "}
            product?
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
              deleteproduct();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProductmodel;
