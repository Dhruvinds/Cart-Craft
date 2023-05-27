const Subcategory = require("../Schema/Subcategory");
const Category = require("../Schema/Category");
const Manufacture = require("../schema/Manufacture");
const Products = require("../schema/Product");
const logger = require("../utils/logger");
const errLogger = require("../utils/errorLogger");

//all products
const allProducts = async (req, res) => {
  const data = await Products.find({})
    .populate("category", "name")
    .populate("subcategory", "name")
    .populate("manufacture", "name");
  res.json(data);
};

// single product
const singleProduct = async (req, res) => {
  const product = await Products.findById(req.params.id)
    .populate("category", "name")
    .populate("subcategory", "name")
    .populate("manufacture", "name");
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });

    errLogger.error(
      `404 ||"Product Not Found" - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

//add product
const addProduct = async (req, res) => {
  const { productname, description, model, upc, location, prize, qty, status } =
    req.body;
  var { category, subcategory, manufacture, image } = req.body;
  const ct = await Category.findOne({ name: category });
  const sbct = await Subcategory.findOne({ name: subcategory });
  const mn = await Manufacture.findOne({ name: manufacture });
  const userName = req.body.userName;
  const userRole = req.body.role;

  var category = ct._id;
  var subcategory = sbct._id;
  var manufacture = mn._id;
  var image = image.split(",");

  var images = image.splice(-1, 1);

  if (
    !category ||
    !subcategory ||
    !manufacture ||
    !productname ||
    !description ||
    !model ||
    !upc ||
    !location ||
    !prize ||
    !qty ||
    !status ||
    !image
  ) {
    res.status(400).json({ message: "All fields are required" });

    errLogger.error(
      `400 ||"All fields are required" - ${userName} - ${userRole} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    const addpro = new Products({
      category,
      subcategory,
      manufacture,
      productname,
      description,
      model,
      upc,
      image,
      location,
      prize,
      qty,
      status,
    });
    const save = await addpro.save();
    await Subcategory.findOneAndUpdate(
      { _id: subcategory },
      { $push: { products: save._id } }
    );
    res.json(save);
    logger.info(
      `Product added Successfully  -${userName} - ${userRole} -  ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

const deleteProduct = async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    await Subcategory.findOneAndUpdate(
      { _id: product.subcategory },
      { $pull: { products: product._id } }
    );
    await product.remove();
    res.json({ message: "Product succsessfully deleted" });
    logger.info(
      `Product deleted Successfully  -  ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    res.status(404).json({ message: "product  not found" });

    errLogger.error(
      `404 ||"Product not found" - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

const updateProduct = async (req, res) => {
  const { productname, description, model, upc, location, prize, qty, status } =
    req.body;

  var { image } = req.body;

  var image = image.split(",");
  var images = image.splice(-1, 1);

  const product = await Products.findById(req.params.id);
  const userName = req.body.userName;
  const userRole = req.body.role;

  if (product) {
    product.productname = productname;
    product.description = description;
    product.model = model;
    product.upc = upc;
    product.location = location;
    product.prize = prize;
    product.qty = qty;
    product.status = status;
    product.image = image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
    logger.info(
      `Product updated Successfully  -${userName} - ${userRole} -  ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    res.status(404).json({ message: "product  not found" });

    errLogger.error(
      `404 ||"Product not found" - ${userName} - ${userRole} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

const deleteProducts = async (req, res) => {
  var multipleids = req.params.ids;
  var singlearr = multipleids.split(",");

  var pdlist = await Products.find({ _id: { $in: singlearr } });
  if (pdlist) {
    const data = await Products.deleteMany({ _id: { $in: singlearr } });

    res.json({ message: "Done" });
    logger.info(
      `Multiple product deleted Successfully  -  ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    res.json({ error: "error" });

    errLogger.error(
      `404 ||"Product not found" - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

module.exports = {
  allProducts,
  addProduct,
  singleProduct,
  deleteProduct,
  updateProduct,
  deleteProducts,
};
