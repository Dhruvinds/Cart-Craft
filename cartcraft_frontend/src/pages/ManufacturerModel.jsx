import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/product.css";
import {
  addManufacturer,
  listManufacturers,
  updateManufacturer,
} from "../Actions/manufacturerActions";

const ManufacturerModel = ({ type, modalOpen, setModalOpen, manufacturer }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState({ display: "none" });
  const [descError, setDescNameError] = useState({ display: "none" });
  const [emailError, setEmailError] = useState({ display: "none" });
  const [locError, setLocError] = useState({ display: "none" });
  const [mobError, setMobError] = useState({ display: "none" });

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && manufacturer) {
      setName(manufacturer.name);
      setDescription(manufacturer.description);
      setEmail(manufacturer.email);
      setLocation(manufacturer.location);
      setPhone(manufacturer.phone);
    } else {
      setName("");
      setDescription("");
      setEmail("");
      setLocation("");
      setPhone("");
    }
  }, [type, manufacturer, modalOpen]);

  async function submit(e) {
    e.preventDefault();
    var validateName = /^[aA-zZ]+$/.test(name);

    var validatemob = /^[0-9]{10}$/.test(phone);

    var validateemail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
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
    } else if (location === "" || location == null) {
      setLocError({ display: "block" });
      setTimeout(() => {
        setLocError({ display: "none" });
      }, 5000);
    } else if (!validatemob) {
      setMobError({ display: "block" });
      setTimeout(() => {
        setMobError({ display: "none" });
      }, 5000);
    } else if (!validateemail) {
      setEmailError({ display: "block" });
      setTimeout(() => {
        setEmailError({ display: "none" });
      }, 5000);
    } else {
      if (type === "update") {
        await dispatch(
          updateManufacturer(
            manufacturer.id,
            name,
            location,
            phone,
            description
          )
        );
        await dispatch(listManufacturers());
        setModalOpen(false);
      } else {
        await dispatch(
          addManufacturer(name, email, location, phone, description)
        );
        await dispatch(listManufacturers());
        setModalOpen(false);
      }
    }
  }

  return (
    <>
      <Modal
        className="mt-4"
        size="lg"
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        centered
        scrollable
        aria-labelledby="example-modal-sizes-lg "
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {type == "add" ? "Add" : "Update"} Manufacturer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name  <span className="required">*</span></Form.Label>
              <Form.Control
                type="Text"
                placeholder="Enter Manifacturer name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div
                style={nameError}
                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
              >
                Please enter valid Name ( Only characters are allowed )
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email  <span className="required">*</span></Form.Label>
              <Form.Control
                disabled={type === "update"}
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <div
                style={emailError}
                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
              >
                Please enter valid Email address
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Location <span className="required">*</span> </Form.Label>
              <Form.Control
                type="Text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />

              <div
                style={locError}
                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
              >
                Location can not be null
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone Number  <span className="required">*</span></Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
               <div
                style={mobError}
                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
              >
                Please enter valid Phone Number
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description  <span className="required">*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
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

export default ManufacturerModel;
