import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { alluserslist, updaterole } from "../Actions/userlistActions";

const RoleUpdateModel = ({ open, setopen, user }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");

  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(updaterole(user.id, role));
    await dispatch(alluserslist());
    setopen(false);
  };

  useEffect(() => {
    if (user) {
      setname(user.fullname);
      setemail(user.email);
      setrole(user.role);
    }
  }, [user]);

  return (
    <>
      <Modal show={open} onHide={() => setopen(false)} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Update Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicfname">
              <Form.Label>Name</Form.Label>
              <Form.Control readOnly type="Text" value={name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicemail">
              <Form.Label>Email</Form.Label>
              <Form.Control readOnly type="Text" value={email} />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicrole">
              <Form.Label>Role</Form.Label>
              <Form.Control readOnly type="Text" value={role} />
            </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setrole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="super admin">super admin</option>
                <option value="admin">admin</option>
                <option value="guest">guest</option>
                <option value="customized">customized</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(e) => submit(e)}
            disabled={role === ""}
          >
            Update
          </Button>
          <Button variant="secondary" onClick={() => setopen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoleUpdateModel;
