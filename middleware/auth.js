import { response } from "express";
import jwt from "jsonwebtoken"
const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.json({ success: false, message: "Not Authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;  // ✅ attach properly
    next();
  } catch (err) {
    res.json({ success: false, message: "Invalid token" });
  }
};




export default authMiddleware;