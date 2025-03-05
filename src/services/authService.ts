import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import User from "../models/user";

const prisma = new PrismaClient();

export const registerOwner = async (user : User) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return prisma.owner.create({
        data: {
            OWNN_FNAME: user.fname,
            OWNN_LNAME : user.lname,
            OWNN_TEL: user.tel,
            OWNN_MAIL : user.email,
            OWNN_MDP: hashedPassword
        }
    });
};

export const emailExists  = async (email: string) => {

    return prisma.owner.findFirst({
        where: {
            OWNN_MAIL: email
        }
    });
};