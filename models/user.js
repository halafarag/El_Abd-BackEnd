const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
  },
  emailAdress: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  gender: {
    type: String,
    required: true,
  },
  moblieNum: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  dateOfBirth: {
    type: Object,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//HASH PASSWORD
userSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
