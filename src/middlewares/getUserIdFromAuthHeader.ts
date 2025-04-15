import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const getUserIdFromAuthHeader = (authHeader?: String) => {
  if (!authHeader) {
    throw new Error("Authorization header manquant");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Token manquant");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: number;
  };

  return payload.userId;
};
