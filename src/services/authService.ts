import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import User from "../models/user";

const prisma = new PrismaClient();

export const registerTenant = async (user : User) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return prisma.tenant.create({
        data: {
            LOCC_NOM: user.surname,
            LOCC_PRENOM : user.name,
            LOCC_MAIL : user.email,
            LOCC_MDP: hashedPassword
        }
    });
};

