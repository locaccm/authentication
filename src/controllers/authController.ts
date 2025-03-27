import { Request, Response } from 'express';
import { connectOwner, registerOwner } from "../services/authService";
import {validatePassword} from "../middlewares/validatePassword";
import User from "../models/user";
import {emailAlreadyExist} from "../middlewares/emailAlreadyExist";
import bcrypt from "bcrypt";

export const signUp = async (req: Request, res: Response): Promise<void> => {
    const { lname, fname, tel, email, password, status } = req.body;
    const userObject: User = {
        id: '',
        lname,
        fname,
        tel,
        email,
        password,
        status
    }
    if(!userObject.lname || !userObject.fname || !userObject.tel || !userObject.email || !userObject.password || !userObject.status){
        res.status(400).json({ error: 'Error during registration : missing information' })
        return;
    }

    try {
        switch (status) {
            case 'owner':
                validatePassword(userObject.password, res);
                await emailAlreadyExist(userObject.email, res);
                const user = await registerOwner(userObject);
                const { OWNN_MDP, ...userWithoutPassword } = user;

                res.status(201).json({ message: 'User created successfully', user: userWithoutPassword })
                return;
            default:
                throw new Error('unknown status');
        }

    }catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: 'Error during registration :' + error.message })
            return;
        } else {
            console.error("Unknown error", error);
        }
    }


};


export const signIn =  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    var userObject: User = {
        email,
        password,
    }
    if(!userObject.email || !userObject.password){
        res.status(400).json({ error: 'Error during connection : missing information' })
        return;
    }

    try {
        let userInBdd = await connectOwner(userObject);

        if (userInBdd === null) {
            res.status(401).json({ error: 'Unkown user' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(userObject.password, userInBdd.OWNN_MDP);
        if(!isPasswordValid){
            res.status(401).json({ error: 'Invalid password' });
        }

        userObject = {
            lname: userInBdd.OWNN_LNAME,
            fname: userInBdd.OWNN_FNAME,
            tel: userInBdd.OWNN_TEL,
            email: userInBdd.OWNN_MAIL
        }

        res.status(200).json({ message: 'User connected successfully', user: userObject });
    }catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: 'Error during connection :' + error.message })
            return;
        } else {
            console.error("Unknown error", error);
        }
    }
}