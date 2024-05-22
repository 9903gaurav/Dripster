const express = require("express");
const { fetchProductDetail } = require("../controller/productController");

const router = express.Router();

router.route("/fetchProduct").post(fetchProductDetail);

module.exports = router;

