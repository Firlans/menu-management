import { verifyToken } from "../config/jwt.js";
import { error } from "../utils/response.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json(error("Token tidak ditemukan", 401));
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json(error("Token tidak valid atau expired", 401));
  }

  req.user = decoded;
  next();
};
