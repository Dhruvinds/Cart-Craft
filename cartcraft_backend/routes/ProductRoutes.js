const {
  allProducts,
  addProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
} = require("../controllers/ProductController");

const express = require("express");
const router = express.Router();

router.route("/all").get(allProducts);
router.route("/add").post(addProduct);
router
  .route("/:id")
  .get(singleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

router.route("/deletemany/:ids").delete(deleteProducts);

module.exports = router;
