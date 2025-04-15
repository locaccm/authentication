import { Request, Response } from "express";
import { connectUser, emailUserExists, registerUser } from "../services/authService";
import { validatePassword } from "../middlewares/validatePassword";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import error from "eslint-plugin-react/lib/util/error";

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
    if(await emailUserExists(user.getMail())){
      throw new Error("Email already exists");
    }
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
    let userInBdd = await connectUser(user);

    if (userInBdd === null) {
      throw new Error("Unkown user");
    }

    const isPasswordValid = await bcrypt.compare(
      user.getPassword()!,
      userInBdd.getPassword()!,
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { userId: userInBdd.getId(), status: userInBdd.getType()! },
      process.env.JWT_SECRET!,
      {
        expiresIn: tokenDuration,
      },
    );

    res
      .status(200)
      .json({
        message: "User connected successfully",
        user: userInBdd,
        token: token,
      });
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

export const inviteTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { USEC_MAIL } =
      req.body;
    if (!USEC_MAIL) {
      throw new Error("missing registration information");
    }
    const user = new User(
      USEC_MAIL,
    );
    user.setStatus("TENANT");

    validatePassword(user.getPassword()!, res);
    if(await emailUserExists(user.getMail())){
      throw new Error("Email already exists");
    }
    const userInDb = await registerUser(user);
    userInDb.removePassword();

    res.status(201).json({
      message: "Tenant invite successfully",
      user: userInDb,
    });
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
}