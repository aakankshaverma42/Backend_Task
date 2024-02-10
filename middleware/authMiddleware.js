const jwt = require("jsonwebtoken");
const generateAuthToken = (userId) => {
  const payload = { user: { id: userId } };
  const secretKey = "your_secret_key";
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secretKey, options);
};

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "secretemyname");
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

const defaultToken = generateAuthToken("example_user_id");

console.log("Default JWT Token:", defaultToken);

module.exports = { generateAuthToken, authMiddleware };
