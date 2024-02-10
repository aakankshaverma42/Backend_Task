const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const { authMiddleware } = require("../middleware/authMiddleware");
const courseController = require("../controllers/courseController");

// Route for creating a new course by a Course creator
router.post(
  "/create/creator",
  authMiddleware,
  courseController.createCourseByCreator
);

// Route for creating a new course
router.post("/create", async (req, res) => {
  try {
    const { name, subject, chapters, type, mode, createdBy } = req.body;
    const course = await Course.create({
      name,
      subject,
      chapters,
      type,
      mode,
      createdBy,
    });
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Route for retrieving all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route for retrieving a single course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, error: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route for updating a course by ID
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, error: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Route for deleting a course by ID
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, error: "Course not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
