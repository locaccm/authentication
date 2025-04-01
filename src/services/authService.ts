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
      OWNC_FNAME: user.fname,
      OWNC_LNAME: user.lname,
      OWNN_TEL: user.tel,
      OWNC_MAIL: user.email,
      OWNC_MDP: hashedPassword,
    },
  });
};

export const connectOwner = async (user: User) => {
  const owner = await prisma.owner.findFirst({
    where: {
      OWNC_MAIL: user.email,
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
      TENC_MAIL: user.email,
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
      OWNC_MAIL: email,
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
      TENC_FNAME: user.fname,
      TENC_LNAME: user.lname,
      TENN_TEL: user.tel,
      TENC_MAIL: user.email,
      TENC_MDP: hashedPassword,
    },
  });
};

export const emailTenantExists = async (email: string) => {
  return prisma.tenant.findFirst({
    where: {
      TENC_MAIL: email,
    },
  });
};
