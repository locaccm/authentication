import { Request, Response } from "express";
import { connectUser, registerUser } from "../services/authService";
import { validatePassword } from "../middlewares/validatePassword";
import User from "../models/user";
import { emailAlreadyExist } from "../middlewares/emailAlreadyExist";
import bcrypt from "bcrypt";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const user = new User(req.body);
  if (!user.hasAllAttributesForRegister()) {
    throw new Error("missing information");
  }

  try {
    validatePassword(user.USEC_PASSWORD!, res);

    await emailAlreadyExist(user.USEC_MAIL!, res);
    const userInDb = await registerUser(user);
    userInDb.removePassword();

    res.status(201).json({
      message: "User created successfully",
      user: userInDb,
    });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      res
        .status(400)
        .json({ error: "Error during registration :" + error.message });
      return;
    } else {
      console.error("Unknown error", error);
    }
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const userObject = req.body as User;
  if (!userObject.hasAllAttributesForConnection()) {
    throw new Error("missing information");
  }

  try {
    let userInBdd = await connectUser(userObject);

    if (userInBdd === null) {
      throw new Error("Unkown user");
    }

    const isPasswordValid = await bcrypt.compare(userObject.USEC_PASSWORD!, userInBdd.USEC_PASSWORD!);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    res
      .status(200)
      .json({ message: "User connected successfully", user: userInBdd });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(400)

        .json({ error: "Error during connection :" + error.message });
      return;
    } else {
      console.error("Unknown error", error);
    }
  }
};
