const {
  addCategories,
  updateCategories,
  allCategories,
  deleteCategory,
  deleteCategories,
  category,
} = require("../controllers/CategoryControllers");
const express = require("express");
const router = express.Router();

router.route("/allCategories").get(allCategories);
router.route("/addCategories").post(addCategories);
router.route("/:id").put(updateCategories).get(category);
router.route("/:id").delete(deleteCategory);
router.route("/deletecategories/:ids").delete(deleteCategories);

module.exports = router;
