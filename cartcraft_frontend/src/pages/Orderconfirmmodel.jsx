import React from "react";
import { Modal, Button } from "react-bootstrap";

const Orderconfirmmodel = ({ open, setopen, message }) => {
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
          <p style={{textAlign:"center"}}>{message}</p>
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Orderconfirmmodel;
