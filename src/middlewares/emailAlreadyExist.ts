import { Response } from "express";
import { emailExists } from "../services/authService";

export const emailAlreadyExist = async (email: string, res: Response) => {
  if (!!(await emailExists(email))) {
    throw new Error("Email already exists");
  }
};
