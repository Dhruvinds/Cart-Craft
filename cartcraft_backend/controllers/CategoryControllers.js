const Category = require("../Schema/Category");
const logger = require("../utils/logger");
const errLogger = require("../utils/errorLogger");

// all allCategories

const allCategories = async (req, res) => {
  const data = await Category.find({}).populate("subcategory");
  res.json(data);
};

const category = async (req, res) => {
  const id = req.params.id;
  const data = await Category.find({ _id: id }).populate("subcategory");
  res.json(data);
};

//Add Categories
const addCategories = async (req, res) => {
  const name = req.body.name.toLowerCase();
  const description = req.body.description;
  const userName = req.body.userName;
  const userRole = req.body.role;
  if (!name || !description) {
    res.status(400).json({ message: "All fields are required" });

    errLogger.error(
      `400 ||"All fields are required" - ${userName} - ${userRole} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    const alreadyexist = await Category.findOne({ name });
    if (alreadyexist) {
      res.status(400).json({ message: "Category already exist!" });

      errLogger.error(
        `400 ||"Category already exist!" - ${userName} - ${userRole} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    } else {
      var data = new Category({ name, description });
      var save = await data.save();
      res.json(save);
      logger.info(
        `Category added successfully -${userName} - ${userRole} -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    }
  }
};

//Update Categories

const updateCategories = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name.toLowerCase();
  const description = req.body.description;
  const userName = req.body.userName;
  const userRole = req.body.role;

  if (!name || !description) {
    res.status(400).json({ message: "All fields are Required" });
    errLogger.error(
      `400 ||"All fields are required" - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    const data = await Category.findOne({ _id: id });
    if (data) {
      data.name = name;
      data.description = description;
      const save = await data.save();
      res.json(save);
      logger.info(
        `Category updated successfully -${userName} - ${userRole} -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    } else {
      res.status(404).json({ message: "Category not found" });
      errLogger.error(
        `404 ||"Category not found" - ${userName} - ${userRole} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    }
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  const data = await Category.findOne({ _id: id }).populate("subcategory");
  if (data) {
    if (data.subcategory.length == 0) {
      await data.remove();
      res.json({ message: "Category deleted successfully" });
      logger.info(
        `Category deleted successfully -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    } else {
      res.status(404).json({
        message:
          "You can't delete Category because it associated with Subcategories",
      });

      errLogger.error(
        `404 ||"You can't delete Category because it associated with Subcategories" - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    }
  } else {
    res.status(404).json({ message: "Category not found" });

    errLogger.error(
      `404 ||"Category not found" - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

const deleteCategories = async (req, res) => {
  var multipleids = req.params.ids;
  var singlearr = multipleids.split(",");
  var ctlist = await Category.find({ _id: { $in: singlearr } }).populate(
    "subcategory"
  );

  var check = () => {
    for (let ct of ctlist) {
      if (ct.subcategory.length == 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  if (check()) {
    const data = await Category.deleteMany({ _id: { $in: singlearr } });
    res.json({ message: "Done" });
  } else {
    res.json({ error: "error" });

    errLogger.error(
      `404 ||"You can't delete Category because it associated with Subcategories" - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

module.exports = {
  allCategories,
  addCategories,
  updateCategories,
  deleteCategory,
  deleteCategories,
  category,
};
