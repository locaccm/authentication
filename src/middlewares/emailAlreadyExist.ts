import { Response } from "express";

import { emailOwnerExists, emailTenantExists } from "../services/authService";

export const emailAlreadyExist = async (email: string, res: Response) => {
  if (!!(await emailOwnerExists(email)) || !!(await emailTenantExists(email))) {
    throw new Error("Email already exists");
  }
};
