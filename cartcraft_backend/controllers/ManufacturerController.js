const Manufacture = require("../schema/Manufacture");
const logger = require("../utils/logger");
const errLogger = require("../utils/errorLogger");

//All Manufacture
const allmanufacturer = async (req, res) => {
  const data = await Manufacture.find({});
  res.json(data);
};

//Add Manufacture
const addmanufacturer = async (req, res) => {
  const { email, location, phone, description } = req.body;
  const name = req.body.name.toLowerCase();
  const userName = req.body.userName;
  const userRole = req.body.role;

  if (!name || !description || !email || !location || !phone) {
    res.status(400).json({ message: "All Fields Are Required" });

    errLogger.error(
      `400 ||"All Fields Are Required" ${userName} - ${userRole} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    const alreadyexist = await Manufacture.find({ $or: [{ name }, { email }] });
    if (alreadyexist.length !== 0) {
      res.status(400).json({ message: "Manufacture already exist!" });

      errLogger.error(
        `400 ||"Manufacture already exist!" - ${userName} - ${userRole} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    } else {
      var data = new Manufacture({ name, email, location, phone, description });
      var save = await data.save();
      res.json(save);
      logger.info(
        `Manufacture updated successfully -${userName} - ${userRole} -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    }
  }
};

// update manufacture
const upadteManufacturer = async (req, res) => {
  const id = req.params.id;
  const { location, phone, description } = req.body;
  const name = req.body.name.toLowerCase();
  const userName = req.body.userName;
  const userRole = req.body.role;

  const details = await Manufacture.findById(id);
  if (details === null || !details) {
    res.status(400).json({ message: "Manufacturer Not Found" });

    errLogger.error(
      `400 ||"Manufacture not found" - ${userName} - ${userRole}- ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    (details.name = name),
      (details.location = location),
      (details.phone = phone),
      (details.description = description);

    var save = await details.save();
    res.json(save);
    logger.info(
      `Manufacture updated successfully -${userName} - ${userRole} -  ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

// delete Manufacture
const deleteManufacturer = async (req, res) => {
  const id = req.params.id;
  const details = await Manufacture.findById(id);
  if (details === null || !details) {
    res.status(400).json({ message: "Manufacturer Not Found" });

    errLogger.error(
      `400 ||"Manufacture not found" - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    await details.remove();
    res.json({ message: "Manufacturer Successfully Deleted" });
  }
};

// delete multiple Manufacture
const deleteManufacturers = async (req, res) => {
  var multipleids = req.params.ids;
  var singlearr = multipleids.split(",");
  var mflist = await Manufacture.find({ _id: { $in: singlearr } });

  if (mflist) {
    const data = await Manufacture.deleteMany({ _id: { $in: singlearr } });
    res.json({ message: "Done" });
  } else {
    res.json({ error: "error" });

    errLogger.error(
      `400 ||"Manufacture not found" - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

module.exports = {
  allmanufacturer,
  addmanufacturer,
  upadteManufacturer,
  deleteManufacturer,
  deleteManufacturers,
};
