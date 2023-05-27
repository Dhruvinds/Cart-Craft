const {
  getMyOrders,
  getOrderById,
  createOrder,
  allOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protected } = require("../Auth/protacted");

const express = require("express");
const router = express.Router();

//getUserOrder
router.route("/myorders").get(protected, getMyOrders);

//get order by id
router.route("/:id").get(getOrderById).put(updateOrderStatus);

//craete new order
router.route("/").post(protected, createOrder).get(allOrders);

module.exports = router;
