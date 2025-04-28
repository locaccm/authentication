import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import User from "../models/user";

const prisma = new PrismaClient();

export const registerUser = async (user: User) => {
  if (!user.hasAllAttributesForRegister()) {
    throw new Error("missing information");
  }
  user.setPassword(await bcrypt.hash(user.getPassword()!, 10));

  const userInDb = await prisma.user.create({
    data: {
      ...user,
    },
  });

  return new User(user.getMail()).mapDbUserToModel(userInDb);
};

export const connectUser = async (user: User) => {
  const userDb = await prisma.user.findFirst({
    where: {
      USEC_MAIL: user.getMail(),
    },
  });
  if (!userDb) {
    return null;
  }
  return new User(user.getMail()).mapDbUserToModel(userDb);
<<<<<<< HEAD
};

export const emailUserExists = async (email: string) => {
  return !!(await prisma.user.findFirst({
    where: {
      USEC_MAIL: email,
    },
  }));
=======
>>>>>>> 754525f125c050157f630ecf5e7d74918a9ae82d
};
