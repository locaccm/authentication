import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import User from "../models/user";

const prisma = new PrismaClient();

export const registerUser = async (user: User) => {
  if (!user.hasAllAttributesForRegister()) {
    throw new Error("missing information");
  }
  user.USEC_PASSWORD = await bcrypt.hash(user.USEC_PASSWORD!, 10);

  const userInDb = await prisma.user.create({
    data: {
      ...user
    },
  });

  return new User(user.USEC_MAIL).mapDbUserToModel(userInDb);
};

export const connectUser = async (user: User) => {
  const userDb = await prisma.user.findFirst({
    where: {
      USEC_MAIL: user.USEC_MAIL,
    },
  });
  if (!userDb) {
    return null;
  }
  return new User(user.USEC_MAIL).mapDbUserToModel(userDb);
};

export const emailUserExists = async (email: string) => {
  return !!prisma.user.findFirst({
    where: {
      USEC_MAIL: email,
    },
  });
};
