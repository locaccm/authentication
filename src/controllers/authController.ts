import { Request, Response } from 'express';
import { registerTenant } from '../services/authService';
import {validatePassword} from "../middlewares/validatePassword";
import User from "../models/user";

export const signUp = async (req: Request, res: Response) => {
    const {surname, name, email, password, status } = req.body;
    const userObject: User = {
        id: '',
        name,
        surname,
        email,
        password,
        status
    }
    try {
        switch (status){
            case 'tenant':
                validatePassword(userObject.password, res);
                const user = await registerTenant(userObject);
                const { LOCC_MDP, ...userWithoutPassword } = user;

                res.status(201).json({ message: 'User created successfully', user: userWithoutPassword });
                break;
            default:
                res.status(400).json({ error: 'Error during registration : unknown status' });
        }

    } catch (error) {
        res.status(400).json({ error: 'Error during registration.' });
    }
};
