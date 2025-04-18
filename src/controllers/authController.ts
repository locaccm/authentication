import { Request, Response } from "express";
import { connectUser, registerUser } from "../services/authService";
import { validatePassword } from "../middlewares/validatePassword";
import User from "../models/user";
import { emailAlreadyExist } from "../middlewares/emailAlreadyExist";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const tokenDuration = 1000 * 60 * 60;

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      USEC_MAIL,
      USEC_PASSWORD,
      USEC_FNAME,
      USEC_LNAME,
      USED_BIRTH,
      USEC_TYPE,
    } = req.body;
    const user = new User(
      USEC_MAIL,
      USEC_PASSWORD,
      USEC_FNAME,
      USEC_LNAME,
      USED_BIRTH,
      USEC_TYPE,
    );
    if (!user.hasAllAttributesForRegister()) {
      throw new Error("missing registration information");
    }
    validatePassword(user.getPassword()!, res);
    await emailAlreadyExist(user.getMail(), res);
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
  try {
    const { USEC_MAIL, USEC_PASSWORD } = req.body;
    const user = new User(USEC_MAIL, USEC_PASSWORD);
    if (!user.hasAllAttributesForConnection()) {
      throw new Error("missing information");
    }
    let userInDb = await connectUser(user);

    if (userInDb === null) {
      throw new Error("Unkown user");
    }

    const isPasswordValid = await bcrypt.compare(
      user.getPassword()!,
      userInDb.getPassword()!,
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

<<<<<<< HEAD
    const token = jwt.sign(
      { userId: userInBdd.getId(), status: userInBdd.getType()! },
      process.env.JWT_SECRET!,
      {
        expiresIn: tokenDuration,
      },
    );

    res.status(200).json({
      message: "User connected successfully",
      user: userInBdd,
      token: token,
    });
=======
    const token = jwt.sign({userId: userInDb.getId(), status: userInDb.getType()!}, process.env.JWT_SECRET!, {
      expiresIn: tokenDuration,
    })

    res
      .status(200)
      .json({ message: "User connected successfully", user: userInDb, token: token });
>>>>>>> 5bc4c16 (fix: review)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(401)
        .json({ error: "Error during connection :" + error.message });
      return;
    } else {
      console.error("Unknown error", error);
    }
  }
};
