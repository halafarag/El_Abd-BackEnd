const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const { auth, isAdmin, isUser } = require("../middlewares/auth");
const orderController = require("../controller/orderController");
// add order
router.post("/", orderController.addOrder);
// get by id
router.get("/user", auth, orderController.getOrdersFoUser);
router.get("/:id", auth, orderController.getByID);
// delete by id
router.delete("/:id", isAdmin, orderController.deleteById);
// get all orders
router.get("/", orderController.getAllOrders);
// edit
router.put("/:id", isAdmin, orderController.editOrder);
module.exports = router;
