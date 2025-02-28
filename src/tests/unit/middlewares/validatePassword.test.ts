import { validatePassword } from '../../../middlewares/validatePassword';
import { Response } from 'express';

describe('Password Validation Tests', () => {
    let res: Response;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
    });

    it('should return error for password shorter than 8 characters', () => {
        const password = 'short';
        validatePassword(password, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'The password must be at least 8 characters long.' });
    });

    it('should return error for password without an uppercase letter', () => {
        const password = 'lowercase1!';
        validatePassword(password, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'The password must contain at least one uppercase letter.' });
    });

    it('should return error for password without a lowercase letter', () => {
        const password = 'UPPERCASE1!';
        validatePassword(password, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'The password must contain at least one lowercase letter.' });
    });

    it('should return error for password without a digit', () => {
        const password = 'Password!';
        validatePassword(password, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'The password must contain at least one digit.' });
    });

    it('should return error for password without a special character', () => {
        const password = 'Password1';
        validatePassword(password, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'The password must contain at least one special character (@$!%*?&).' });
    });

    it('should pass validation for a valid password', () => {
        const password = 'ValidPassword1!';
        validatePassword(password, res);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});
