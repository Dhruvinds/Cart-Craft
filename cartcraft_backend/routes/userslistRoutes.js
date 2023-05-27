const {
  allusersgetlist,
  updateRole,
} = require("../controllers/UserlistController");

const express = require("express");
const router = express.Router();

router.route("/all").get(allusersgetlist);
router.route("/:id").put(updateRole);

module.exports = router;
