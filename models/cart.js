const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = new Schema(
  {
    user: {
      type: Array,
      ref: "User",
      required: true,
    },
    product: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
