require("dotenv").config();
const jwt = require("jsonwebtoken");

const getToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "720h" });
  return token;
};

module.exports = getToken;