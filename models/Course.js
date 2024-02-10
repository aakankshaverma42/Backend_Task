const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  chapters: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["Personalised", "Group"],
    required: true,
  },
  mode: {
    type: String,
    enum: ["Assisted", "Self Learning"],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
