const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 100,
      unique: true,
      required: true,
    },
    img: {
      type: Array,
    },
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
