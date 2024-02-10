const express = require("express");
const mongoose = require("mongoose");
const { parseJSON, handleCORS } = require("./middleware/middleware");
const courseRoutes = require("./routes/courses");

const app = express();

// Middleware
app.use(parseJSON);
app.use(handleCORS);

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/courseDB", {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.use("/courses", courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
