const Order = require("../Schema/Order");
const User = require("../Schema/UserSchema");
const Products = require("../schema/Product");

const createOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const userdetalis = await User.findById(user._id);

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: "No Order Found" });
    return;
  } else {
    const order = new Order({
      orderItems,
      user: userdetalis._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: req.body.paymentResult.id,
        status: req.body.paymentResult.status,
        update_time: req.body.paymentResult.update_time,
        email_address: req.body.paymentResult.payer.email_address,
      },
    });

    const neworder = await order.save();
    res.status(201).json(neworder);

    for (let abc of neworder.orderItems) {
      const doc = await Products.findOne({ _id: abc.product });
      const doc11 = await Products.findOneAndUpdate(
        { _id: doc._id },
        { qty: Number(doc.qty) - Number(abc.qty) }
      );
    }
  }
};

//getOrderByID
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json("Order not found");
  }
};

const getMyOrders = async (req, res) => {
  const userData = await User.findById(user._id);

  const orders = await Order.find({ user: userData._id });
  res.json(orders);
};

const allOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "firstName lastName");
  res.json(orders);
};

const updateOrderStatus = async (req, res) => {
  const orderDetails = await Order.findOne({ _id: req.params.id });
  if (orderDetails) {
    orderDetails.status = req.body.status;
    const save = await orderDetails.save();
    res.json({ message: "Order Status updated successfully" });
  } else {
    res.json({ message: "Order not found" });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  allOrders,
  updateOrderStatus,
};
