const users = require("../Schema/UserSchema");
const Role = require("../Schema/Roles");
const logger = require("../utils/logger");

const allusersgetlist = async (req, res) => {
  const data = await users.find({}).populate("role", "name");
  res.json(data);
};

const updateRole = async (req, res) => {
  const id = req.params.id;
  const roleName = req.body.role;
  const roleid = await Role.findOne({ name: roleName });
  const data = await users.findOne({ _id: id });
  if (data) {
    data.role = roleid._id;

    const save = await data.save();
    res.json({ message: "Role updated successfully" });
    logger.info(
      `Role updated successfully  - ${roleName} -  ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

module.exports = { allusersgetlist, updateRole };
