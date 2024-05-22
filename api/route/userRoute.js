const express = require("express");
const {
  login,
  signup,
  verifyLogin,
  logout,
  fetchAccDetail,
  updatePassword,
  updateAccDetail,
} = require("../controller/userController");

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/verifyLogin").post(verifyLogin);
router.route("/logout").post(logout);
router.route("/fetchAccDetail").post(fetchAccDetail);
router.route("/changePassword").post(updatePassword);
router.route("/updateAccount").post(updateAccDetail);

module.exports = router;
