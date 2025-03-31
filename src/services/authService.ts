import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import User from "../models/user";

const prisma = new PrismaClient();

export const registerOwner = async (user: User) => {
  if (
    !user.lname ||
    !user.fname ||
    !user.tel ||
    !user.email ||
    !user.password ||
    !user.status
  ) {
    throw new Error("missing information");
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);

  return prisma.owner.create({
    data: {
      OWNN_FNAME: user.fname,
      OWNN_LNAME: user.lname,
      OWNN_TEL: user.tel,
      OWNN_MAIL: user.email,
      OWNN_MDP: hashedPassword,
    },
  });
};

export const connectOwner = async (user: User) => {
  const owner = await prisma.owner.findFirst({
    where: {
      OWNN_MAIL: user.email,
    },
  });
  if (!owner) {
    return null;
  }
  return owner;
};
export const connectTenant = async (user: User) => {
  const tenant = await prisma.tenant.findFirst({
    where: {
      TENN_MAIL: user.email,
    },
  });
  if (!tenant) {
    return null;
  }
  return tenant;
};

export const emailOwnerExists = async (email: string) => {
  return prisma.owner.findFirst({
    where: {
      OWNN_MAIL: email,
    },
  });
};
export const registerTenant = async (user: User) => {
  if (
    !user.lname ||
    !user.fname ||
    !user.tel ||
    !user.email ||
    !user.password ||
    !user.status
  ) {
    throw new Error("missing information");
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);

  return prisma.tenant.create({
    data: {
      TENN_FNAME: user.fname,
      TENN_LNAME: user.lname,
      TENN_TEL: user.tel,
      TENN_MAIL: user.email,
      TENN_MDP: hashedPassword,
    },
  });
};

export const emailTenantExists = async (email: string) => {
  return prisma.tenant.findFirst({
    where: {
      TENN_MAIL: email,
    },
  });
};
