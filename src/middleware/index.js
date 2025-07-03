import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ status: "ERROR", message: "Access denied! No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role === "ADMIN" || decoded.role === "SUPERADMIN") {
      req.user = decoded; // Lưu thông tin user vào request
      next();
    } else {
      return res.status(403).json({
        status: "ERROR",
        message: "Access denied! Insufficient permissions.",
      });
    }
  } catch (err) {
    console.error("Token verification failed:", err);
    return res
      .status(403)
      .json({ status: "ERROR", message: "Invalid or expired token." });
  }
};

export const authUSerMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: "ERROR", message: "Access denied! No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Lưu thông tin user vào request
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res
      .status(403)
      .json({ status: "ERROR", message: "Invalid or expired token." });
  }
};
