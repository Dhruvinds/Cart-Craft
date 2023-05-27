const express = require("express");
const {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  userProfile,
  editProfile,
  changePassword,
} = require("../controllers/UserControllers");
const { protected } = require("../Auth/protacted");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgetpassword").post(forgetPassword);
router.route("/resetpassword").put(resetPassword);
router.route("/changepassword").put(protected, changePassword);
router
  .route("/profile")
  .get(protected, userProfile)
  .put(protected, editProfile);
  

module.exports = router;
