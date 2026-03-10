import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config";

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const cookieToken = req.cookies?.token;
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  const token = cookieToken || bearerToken;

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
