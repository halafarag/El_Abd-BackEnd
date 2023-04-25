const mongoose = require("mongoose");
const { Schema } = mongoose;
const favSchema = new Schema(
  {
    user: {
      type: Array,
      ref: "User",
      required: true,
    },
    product: {
      type: Array,
      required: true,
      ref: "Product",
    },
  },
  { timestamps: true }
);
const Favourite = mongoose.model("Favourite", favSchema);
module.exports = Favourite;
