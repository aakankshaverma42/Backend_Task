const express = require("express");
const cors = require("cors");

const parseJSON = express.json();

const handleCORS = cors();

module.exports = {
  parseJSON,
  handleCORS,
};
