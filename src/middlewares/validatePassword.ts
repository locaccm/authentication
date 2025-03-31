import { Response } from "express";

export const validatePassword = (password: string, res: Response) => {
  if (!hasMinimumLength(password, 8)) {
    return res
      .status(400)
      .json({ error: "The password must be at least 8 characters long." });
  }
  if (!hasUppercase(password)) {
    return res.status(400).json({
      error: "The password must contain at least one uppercase letter.",
    });
  }
  if (!hasLowercase(password)) {
    return res.status(400).json({
      error: "The password must contain at least one lowercase letter.",
    });
  }
  if (!hasDigit(password)) {
    return res
      .status(400)
      .json({ error: "The password must contain at least one digit." });
  }
  if (!hasSpecialCharacter(password)) {
    return res.status(400).json({
      error:
        "The password must contain at least one special character (@$!%*?&).",
    });
  }
};

const hasMinimumLength = (password: string, length: number): boolean => {
  return password.length >= length;
};

const hasUppercase = (password: string): boolean => {
  return /[A-Z]/.test(password);
};

const hasLowercase = (password: string): boolean => {
  return /[a-z]/.test(password);
};

const hasDigit = (password: string): boolean => {
  return /\d/.test(password);
};

const hasSpecialCharacter = (password: string): boolean => {
  return /[@$!%*?&]/.test(password);
};
