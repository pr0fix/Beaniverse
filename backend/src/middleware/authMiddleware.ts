import { Response, NextFunction, Request } from "express";
import { RequestWithUser } from "../utils/types";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import User from "../models/user";

// check that token exists in request
export const authenticateToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  try {
    if (!JWT_SECRET) {
      res.status(500).json({ error: "JWT secret is not defined." });
      return;
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// used to authenticate admin role for POST, PUT & DELETE requests
export const authenticateRole = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user || user.role !== "admin") {
      res.status(403).json({ error: "Access denied." });
      return;
    }
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid role." });
  }
};
