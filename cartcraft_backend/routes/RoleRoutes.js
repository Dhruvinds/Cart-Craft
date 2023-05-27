const express = require("express");
const router = express.Router();

const {
  allRoles,
  addRoles,
  singleRole,
  updateRole,
} = require("../controllers/RoleController");

router.route("/add").post(addRoles);
router.route("/all").get(allRoles);
router.route("/:role").get(singleRole).put(updateRole);

module.exports = router;
