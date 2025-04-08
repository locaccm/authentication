import { Response } from "express";

import { emailUserExists } from "../services/authService";

export const emailAlreadyExist = async (email: string, res: Response) => {
  if (await emailUserExists(email)) {
    throw new Error("Email already exists");
  }
};
