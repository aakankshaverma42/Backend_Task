// controllers/courseController.js

const Course = require("../models/Course");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Controller function for creating a new course by a Course creator
const createCourseByCreator = async (req, res) => {
  try {
    const { name, subject, chapters, type, mode } = req.body;
    const createdBy = req.user.id;
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
};

// Controller function for creating a new course
const createCourse = async (req, res) => {
  try {
    const createdBy = new ObjectId();
    const course = await Course.create({
      ...req.body,
      createdBy: createdBy,
    });

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Controller function to retrieve all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to retrieve a single course by ID
const getCourseById = async (req, res) => {
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
};

// Controller function to update a course by ID
const updateCourse = async (req, res) => {
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
};

// Controller function to delete a course by ID
const deleteCourse = async (req, res) => {
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
};

module.exports = {
  createCourse,
  createCourseByCreator,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
