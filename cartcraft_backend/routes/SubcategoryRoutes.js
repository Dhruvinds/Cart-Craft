const express = require("express");
const router = express.Router();

const {
  addSubCategory,
  allSubcategories,
  deleteSubcategory,
  updateSubcategories,
  deleteMultiplesubCategories,
} = require("../controllers/SubCategoryController");

router.route("/add").post(addSubCategory);
router.route("/all").get(allSubcategories);
router.route("/delete/:id").delete(deleteSubcategory);
router.route("/:id").put(updateSubcategories);
router.route("/deletemany/:ids").delete(deleteMultiplesubCategories);

module.exports = router;
