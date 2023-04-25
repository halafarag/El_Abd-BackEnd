const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      minLength: 3,
      maxLength: 200,
    },
    price: {
      type: Number,
      required: true,
    },
    volume: {
      type: String,
    },
    img: {
      type: Array,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    discount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
