const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const Name = mongoose.model("Name", nameSchema);

module.exports = Name;
