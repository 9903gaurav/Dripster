const express = require("express");
const {
  addToCart,
  fetchCart,
  deleteProduct,
  updateCartProduct,
  applyCoupon,
  removeCoupon,
  userCheckout,
} = require("../controller/cartController");

const router = express.Router();

router.route("/addToCart").post(addToCart);
router.route("/fetchCart").post(fetchCart);
router.route("/deleteProduct").post(deleteProduct);
router.route("/updateCartQty").post(updateCartProduct);
router.route("/applyCoupon").post(applyCoupon);
router.route("/removeCoupon").post(removeCoupon);
router.route("/checkout").post(userCheckout);

module.exports = router;
