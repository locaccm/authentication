import {Response} from "express";
import {emailExists} from "../services/authService";


export const emailAlreadyExist = async (email: string, res: Response) => {
    if (!!(await emailExists(email))) {
        return res.status(400).json({error: 'The email is not valid.'});
    }
}