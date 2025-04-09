import { Request, Response } from "express";


export const checkAccess= async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO
    const { access } = req.body;
    if (!access) {
      throw new Error("Access level is required");
      return;
    }
    if (access !== "admin") {
      throw new Error("Access denied");
      return;
    }
    res.status(200).json({ message: "Access granted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      res.status(401).json({ error: "Error during access check :" + error.message });
      return;
    } else {
      console.error("Unknown error", error);
    }
  }
}