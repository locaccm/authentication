import request from 'supertest';
import app from '../../index'; // Assure-toi que ton app Express est exportée depuis index.ts

describe('Authentication route tests.', () => {
    it('Should register a new tenant.', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({
                email: 'test@example.com',
                password: 'ValidPass1!',
                name: "pedro",
                surname: "toto",
                status: "tenant"
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User created successfully');
    });

    it('Should reject a registration with an invalid password.', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({
                email: 'test@example.com',
                password: 'short',
                name: "pedro",
                surname: "toto",
                status: "tenant"
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'The password must be at least 8 characters long.');
    });

    it('Should reject a registration with an unknown status.', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({
                email: 'test@example.com',
                password: 'ValidPass1!',
                name: "pedro",
                surname: "toto",
                status: "Spaghetti"
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Error during registration : unknown status');
    });
});
