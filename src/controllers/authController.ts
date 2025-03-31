import { Request, Response } from "express";
import {
  connectOwner,
  connectTenant,
  registerOwner,
  registerTenant,
} from "../services/authService";
import { validatePassword } from "../middlewares/validatePassword";
import User from "../models/user";
import { emailAlreadyExist } from "../middlewares/emailAlreadyExist";
import bcrypt from "bcrypt";
import { mapDbOwnerToModel } from "../map/mapDbOwnerToModel";
import { mapDbTenantToModel } from "../map/mapDbTenantToModel";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { lname, fname, tel, email, password, status } = req.body;
  const userObject: User = {
    id: undefined,
    lname,
    fname,
    tel,
    email,
    password,
    status,
  };
  if (
    !userObject.lname ||
    !userObject.fname ||
    !userObject.tel ||
    !userObject.email ||
    !userObject.password ||
    !userObject.status
  ) {
    res
      .status(400)
      .json({ error: "Error during registration : missing information" });
    return;
  }

  try {
    validatePassword(userObject.password, res);

    await emailAlreadyExist(userObject.email, res);
    switch (status) {
      case "owner": {
        const owner = await registerOwner(userObject);
        const { OWNC_MDP, ...userWithoutPasswordOwner } = owner;

        res.status(201).json({
          message: "User created successfully",
          user: userWithoutPasswordOwner,
        });
        return;
      }
      case "tenant": {
        const tenant = await registerTenant(userObject);
        const { TENC_MDP, ...userWithoutPasswordtenant } = tenant;

        res.status(201).json({
          message: "User created successfully",
          user: userWithoutPasswordtenant,
        });
        return;
      }
      default: {
        throw new Error("unknown status");
      }
    }
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
  if (!userObject.email || !userObject.password) {
    res
      .status(400)
      .json({ error: "Error during connection : missing information" });
    return;
  }

  try {
    let userInBdd = mapDbOwnerToModel(await connectOwner(userObject));
    let password;
    if (userInBdd === null) {
      userInBdd = mapDbTenantToModel(await connectTenant(userObject));
      if (userInBdd !== null) {
        password = userInBdd.password;
      }
    } else {
      password = userInBdd.password;
    }

    if (userInBdd === null || password === undefined) {
      res.status(401).json({ error: "Unkown user" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(userObject.password, password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password" });
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
