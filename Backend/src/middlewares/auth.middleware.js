import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {

    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await userModel
      .findById(decoded.id);

    if (!user || user.activeSessionId !== decoded.sessionId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    req.user = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    };

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};