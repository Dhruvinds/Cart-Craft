const {
  allmanufacturer,
  addmanufacturer,
  upadteManufacturer,
  deleteManufacturer,
  deleteManufacturers,
} = require("../controllers/ManufacturerController");

const express = require("express");
const router = express.Router();

router.route("/all").get(allmanufacturer);
router.route("/add").post(addmanufacturer);
router.route("/:ids").delete(deleteManufacturers);
router.route("/:id").put(upadteManufacturer).delete(deleteManufacturer);

module.exports = router;
