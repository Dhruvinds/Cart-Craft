const Subcategory = require("../Schema/Subcategory");
const Category = require("../Schema/Category");
const logger = require("../utils/logger");
const errLogger = require("../utils/errorLogger");

const addSubCategory = async (req, res) => {
  const category = req.body.category;
  const name = req.body.name.toLowerCase();
  const description = req.body.description;
  const userName = req.body.userName;
  const userRole = req.body.role;

  if (!name || !description || !category) {
    res.status(400).json({ message: "All Fields Are Required" });

    errLogger.error(
      `400 || "All Fields Are Required" - ${userName} - ${userRole} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    const alreadyexist = await Category.findOne({ name: category });
    const subctexitsinct = await Subcategory.findOne({
      $and: [{ name: name }, { category: alreadyexist._id }],
    });
    if (subctexitsinct) {
      res
        .status(400)
        .json({ message: "Subcategory already exist in this Category!" });

      errLogger.error(
        `400 ||"Subcategory already exist in this Category!" - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    } else {
      const parent = await Category.findOne({ name: category });
      var categoryId = parent._id;
      const addsub = new Subcategory({
        name,
        description,
        category: categoryId,
      });
      const save = await addsub.save();
      await Category.findOneAndUpdate(
        { _id: categoryId },
        { $push: { subcategory: save._id } }
      );
      res.json(save);
      logger.info(
        `Subcategory added successfully -${userName} - ${userRole} -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    }
  }
};

//subcategories show
const allSubcategories = async (req, res) => {
  const data = await Subcategory.find({}).populate("category");
  res.json(data);
};

//Update Subcategories
const updateSubcategories = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name.toLowerCase();
  const description = req.body.description;
  const userName = req.body.userName;
  const userRole = req.body.role;

  if (!name || !description) {
    res.status(400).json({ message: "All fields are Required" });

    errLogger.error(
      `400 ||"All fields are Required" - ${userName} - ${userRole} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    const data = await Subcategory.findOne({ _id: id });
    if (data) {
      data.name = name;
      data.description = description;
      const save = await data.save();
      res.json(save);
      logger.info(
        `Subcategory updated successfully -${userName} - ${userRole} -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    } else {
      res.status(404).json({ message: "Subcategory not found" });

      errLogger.error(
        `404 ||"Subcategory not found" - ${userName} - ${userRole} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    }
  }
};

//delete Subcategories
const deleteSubcategory = async (req, res) => {
  const id = req.params.id;
  const data = await Subcategory.findOne({ _id: id }).populate(
    "products",
    "name"
  );
  if (data) {
    if (data.products.length === 0) {
      await Category.findOneAndUpdate(
        { _id: data.category },
        { $pull: { subcategory: data._id } }
      );
      await data.remove();
      res.json({ message: "Subcategory Delete Successfully" });
      logger.info(
        `Subcategory  Delete Successfully  -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    } else {
      res.status(400).json({
        message:
          "You can't delete Subcategory because it associated with products",
      });

      errLogger.error(
        `400 ||"You can't delete Subcategory because it associated with products" - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    }
  } else {
    res.status(404).json({ message: "Category not found" });

    errLogger.error(
      `404 ||"Category not found" - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

// Multiple delete Subcategories
const deleteMultiplesubCategories = async (req, res) => {
  var multipleids = req.params.ids;
  var singlearr = multipleids.split(",");
  var ctlist = await Subcategory.find({ _id: { $in: singlearr } });

  var check = () => {
    for (let ct of ctlist) {
      if (ct.products.length == 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  if (check()) {
    const data = await Subcategory.deleteMany({ _id: { $in: singlearr } });
    res.json({ message: "Done" });
    logger.info(
      `Subcategory  Deletemany Successfully  -  ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    res.json({ error: "error" });

    errLogger.error(
      `400 ||"You can't delete Subcategory because it associated with products" - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

module.exports = {
  addSubCategory,
  allSubcategories,
  updateSubcategories,
  deleteSubcategory,
  deleteMultiplesubCategories,
};
