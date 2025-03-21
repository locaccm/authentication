import { Request, Response } from 'express';
import {registerOwner} from '../services/authService';
import {validatePassword} from "../middlewares/validatePassword";
import User from "../models/user";
import {emailAlreadyExist} from "../middlewares/emailAlreadyExist";

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
    if(!lname || !fname || !tel || !email || !password || !status){
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
