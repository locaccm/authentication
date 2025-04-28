import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { rolesPermissions } from "../config/rolesPermissions";

export const checkAccess = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { token, rightName } = req.body;

    if (!token) {
      throw new Error("Token is missing");
    }
    if (!rightName) {
      throw new Error("Right name is missing");
    }
<<<<<<< HEAD
=======

>>>>>>> 754525f125c050157f630ecf5e7d74918a9ae82d
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      status: string;
    };
<<<<<<< HEAD
    const accessApprouved =
      rolesPermissions[decoded.status].includes(rightName) ||
      rolesPermissions.everyone.includes(rightName);

    if (accessApprouved) {
=======
    const accessApproved =
      rolesPermissions[decoded.status].includes(rightName) ||
      rolesPermissions.everyone.includes(rightName);

    if (accessApproved) {
>>>>>>> 754525f125c050157f630ecf5e7d74918a9ae82d
      res.status(200).json({ message: "Access granted" });
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      res
        .status(401)
        .json({ error: "Error during access check :" + error.message });
      return;
    } else {
      console.error("Unknown error", error);
    }
  }
};
