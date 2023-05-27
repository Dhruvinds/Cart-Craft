const mongoose = require("mongoose");

const sc = mongoose.Schema(
  {
    name: {
      type: String,
    },
    permissions: [
      {
        ctadd: { type: Boolean },
        ctupdate: { type: Boolean },
        ctdelete: { type: Boolean },
        sbctadd: { type: Boolean },
        sbctupdate: { type: Boolean },
        sbctdelete: { type: Boolean },
        prdctadd: { type: Boolean },
        prdctupdate: { type: Boolean },
        prdctdelete: { type: Boolean },
        mfradd: { type: Boolean },
        mfrupdate: { type: Boolean },
        mfrdelete: { type: Boolean },
      },
    ],
  },
  { timestamps: true }
);

const Role = new mongoose.model("Role", sc);
module.exports = Role;
