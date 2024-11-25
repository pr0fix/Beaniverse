import { Response, NextFunction } from "express";
import { RequestWithUser } from "../utils/types";
import jwt from "jsonwebtoken";
import User from "../models/user";

// check that token exists in request
export const authenticateToken = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token missing" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.status(403).json({ error: "Invalid token" });
      return;
    }

    req.user = user;
    next();
  });
};

// used to authenticate admin role for POST, PUT & DELETE requests
export const authenticateRole = (role: string) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== role) {
      res.status(403).json({ error: "Access denied" });
      return;
    }
    next();
  };
};
