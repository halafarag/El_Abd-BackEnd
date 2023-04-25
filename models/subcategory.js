const mongoose = require("mongoose");

const { Schema } = mongoose;
const subcatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    img: {
      type: Array,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);
const SubCategory = mongoose.model("SubCategory", subcatSchema);
module.exports = SubCategory;
