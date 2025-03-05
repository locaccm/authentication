import request from 'supertest';
import app from '../../index';

describe('Authentication route tests.', () => {

    const dataTest = [
        {input: { email: 'testapprouved'+Math.floor(Math.random() * 1000000)+'@example.com', password: 'ValidPass1!', lname: "pedro", tel: "123456789", fname: "toto", status: "owner"}, expected: { message: 'User created successfully', responseCode : 201, messagePath: "message"} , itTitle: 'Should register a new owner.'}, // NOSONAR
        {input: { email: 'testbadpassword'+Math.floor(Math.random() * 1000000)+'@example.com', password: 'short', lname: "pedro", tel: "123456789", fname: "toto", status: "owner" }, expected: { message: 'The password must be at least 8 characters long.', responseCode : 400, messagePath: "error"}, itTitle: 'Should reject a registration with a short password.'}, // NOSONAR
        {input: { email: 'testunknownStatus'+Math.floor(Math.random() * 1000000)+'@example.com', password: 'ValidPass1!', lname: "pedro", tel: "123456789", fname: "toto", status: "Spaghetti" }, expected: { message: 'Error during registration :unknown status', responseCode : 400, messagePath: "error"}, itTitle: 'Should reject a registration with an unknown status.'}, // NOSONAR
        {input: { email: 'testbadpassword'+Math.floor(Math.random() * 1000000)+'@example.com', password: 'short', lname: "pedro", fname: "toto", status: "owner" }, expected: { message: 'Error during registration : missing information', responseCode : 400, messagePath: "error"}, itTitle: 'Should reject a registration with a missing information.'}, // NOSONAR
    ]

  for (const data of dataTest) {
        it(data.itTitle, async () => {
            const res = await request(app)
                .post('/auth/signup')
                .send(data.input);
            console.log("BJR");
            console.log(res.statusCode);
            expect(res.statusCode).toEqual(data.expected.responseCode);
            expect(res.body).toHaveProperty(data.expected.messagePath, data.expected.message);
        });
    }

    it('Should reject a registration with an already exist email.', async () => {
        const originalRes = await request(app)
            .post('/auth/signup')
            .send({
                email: 'existingemail@example.com',
                password: 'ValidPass1!', // NOSONAR
                lname: "pedro",
                tel: "123456789",
                fname: "toto",
                status: "owner"
            });

        const res = await request(app)
            .post('/auth/signup')
            .send({
                email: 'existingemail@example.com',
                password: 'ValidPass1!', // NOSONAR
                lname: "pedro",
                tel: "123456789",
                fname: "toto",
                status: "owner"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Error during registration :Email already exists');
    });
});
