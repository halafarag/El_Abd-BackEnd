const express = require("express");
const { Router } = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const { isUser } = require("../middlewares/auth");

// ADD TO CART
router.post("/", cartController.addToCart);
// GET CART BY USER ID
router.get("/:id", isUser, cartController.getCartByUserID);
// DELETE
router.delete("/:id", isUser, cartController.deleteFromCart);
// EDIT
router.put("/:id", isUser, cartController.updateQuantity);
// GET ALL CARTS FOR USER
router.get("/", isUser, cartController.getAll);

module.exports = router;
