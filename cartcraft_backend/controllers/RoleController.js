const Role = require("../Schema/Roles");
const logger = require("../utils/logger");

// all roles
const allRoles = async (req, res) => {
  const data = await Role.find({});
  res.json(data);
};

// single role
const singleRole = async (req, res) => {
  const data = await Role.findOne({ name: req.params.role });
  if (data) {
    res.json(data.permissions[0]);
  }
};

// add roles
const addRoles = async (req, res) => {
  const {
    name,
    ctadd,
    ctupdate,
    ctdelete,
    sbctadd,
    sbctupdate,
    sbctdelete,
    prdctadd,
    prdctupdate,
    prdctdelete,
    mfradd,
    mfrupdate,
    mfrdelete,
  } = req.body;

  const permissions = [
    {
      ctadd,
      ctupdate,
      ctdelete,
      sbctadd,
      sbctupdate,
      sbctdelete,
      prdctadd,
      prdctupdate,
      prdctdelete,
      mfradd,
      mfrupdate,
      mfrdelete,
    },
  ];

  const addRole = new Role({
    name,
    permissions,
  });
  const data = await addRole.save();
  res.json(data);
};

const updateRole = async (req, res) => {
  const data = await Role.findOne({ name: req.params.role });
  if (data) {
    data.permissions[0].ctadd = req.body.ctadd;
    data.permissions[0].ctupdate = req.body.ctupdate;
    data.permissions[0].ctdelete = req.body.ctdelete;
    data.permissions[0].sbctadd = req.body.sbctadd;
    data.permissions[0].sbctupdate = req.body.sbctupdate;
    data.permissions[0].sbctdelete = req.body.sbctdelete;
    data.permissions[0].mfradd = req.body.mfradd;
    data.permissions[0].mfrupdate = req.body.mfrupdate;
    data.permissions[0].mfrdelete = req.body.mfrdelete;
    data.permissions[0].prdctadd = req.body.prdctadd;
    data.permissions[0].prdctupdate = req.body.prdctupdate;
    data.permissions[0].prdctdelete = req.body.prdctdelete;

    const save = await data.save();
    res.json({ message: "Permissions updated successfully" });
    logger.info(
      `User role Update Successfully  - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

module.exports = { addRoles, allRoles, singleRole, updateRole };
