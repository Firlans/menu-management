import jwt from "jsonwebtoken";

export const getToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "720h" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};
