import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { listallOrders, updateOrderstatus } from "../Actions/allordersActions";

const Orderstatusmodel = ({ modalOpen, setModalOpen, order }) => {
  const dispatch = useDispatch();
  const [status, setstatus] = useState();
  const [id, setid] = useState();

  async function submit() {
    await dispatch(updateOrderstatus(id, status));
    setModalOpen(false);
    dispatch(listallOrders());
  }

  useEffect(() => {
    if (order) {
      setid(order.id);
      setstatus(order.status);
    }
  }, [order, modalOpen, setModalOpen]);

  return (
    <>
      <Modal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title> Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                ID <span className="required">*</span>
              </Form.Label>
              <Form.Control type="Text" value={id} disabled />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setstatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Order Placed">Order Placed</option>
                <option value="Shipped">Shipped</option>

                <option value="Out for Delivery">Out for Delivery </option>
                <option value="Delivered">Delivered</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => submit(e)}>
            Update
          </Button>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Orderstatusmodel;
