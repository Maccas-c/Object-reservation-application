const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  login: {
    email: String,
    hash: String,
    salt: String,
  },
  longing2: {
    id: String,
  },
  name: String,
  surname: String,
  age: Number,
  phone_number: String,
  sex: String,
  role: {
    type: String,
    default: "user",
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
  },
  isStudent: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  vat: {
    nip: String,
  },
});

module.exports = mongoose.model("userModel", userModel);
