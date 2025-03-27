import request from 'supertest';
import app from '../../index';

describe('Authentication all route tests.', () => {
  const dataSignUpTest = [
    {
      input: {
        email: 'testapprouved' + Math.floor(Math.random() * 1000000) + '@example.com',
        password: 'ValidPass1!',
        lname: "pedro",
        tel: "123456789",
        fname: "toto",
        status: "owner"
      },
      expected: { message: 'User created successfully', responseCode: 201, messagePath: "message" },
      itTitle: 'Should register a new owner.'
    }, // NOSONAR
    {
      input: {
        email: 'testbadpassword' + Math.floor(Math.random() * 1000000) + '@example.com',
        password: 'short',
        lname: "pedro",
        tel: "123456789",
        fname: "toto",
        status: "owner"
      },
      expected: {
        message: 'The password must be at least 8 characters long.',
        responseCode: 400,
        messagePath: "error"
      },
      itTitle: 'Should reject a registration with a short password.'
    }, // NOSONAR
    {
      input: {
        email: 'testunknownStatus' + Math.floor(Math.random() * 1000000) + '@example.com',
        password: 'ValidPass1!',
        lname: "pedro",
        tel: "123456789",
        fname: "toto",
        status: "Spaghetti"
      },
      expected: { message: 'Error during registration :unknown status', responseCode: 400, messagePath: "error" },
      itTitle: 'Should reject a registration with an unknown status.'
    }, // NOSONAR
    {
      input: {
        email: 'testbadpassword' + Math.floor(Math.random() * 1000000) + '@example.com',
        password: 'short',
        lname: "pedro",
        fname: "toto",
        status: "owner"
      },
      expected: { message: 'Error during registration : missing information', responseCode: 400, messagePath: "error" },
      itTitle: 'Should reject a registration with a missing information.'
    }, // NOSONAR
  ]

  const dataSignInTest = [
    {
      input: { email: dataSignUpTest[0].input.email, password: dataSignUpTest[0].input.password },
      expected: { message: 'User connected successfully', responseCode: 200, messagePath: "message" },
      itTitle: 'Should connect owner.'
    }, // NOSONAR
    {
      input: { email: dataSignUpTest[0].input.email + "unknown", password: dataSignUpTest[0].input.password },
      expected: { message: 'Unkown user', responseCode: 401, messagePath: "error" },
      itTitle: 'Should reject a connection because the user is unkown.'
    }, // NOSONAR
    {
      input: { email: dataSignUpTest[0].input.email + "unknown" },
      expected: { message: 'Error during connection : missing information', responseCode: 400, messagePath: "error" },
      itTitle: 'Should reject a connection with a missing information.'
    }, // NOSONAR
    {
      input: { email: dataSignUpTest[0].input.email, password: "wrongPassword123" },
      expected: { message: 'Invalid password', responseCode: 401, messagePath: "error" },
      itTitle: 'Should reject a connection because the password is not valid.'
    }, // NOSONAR
  ]

  describe('Authentication sing up route tests.', () => {

    for (const data of dataSignUpTest) {
      it(data.itTitle, async () => {
        const res = await request(app)
          .post('/auth/signup')
          .send(data.input);
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

  describe('Authentication sign in route tests.', () => {

    for (const data of dataSignInTest) {
      it(data.itTitle, async () => {
        const res = await request(app)
          .post('/auth/signin')
          .send(data.input);
        expect(res.statusCode).toEqual(data.expected.responseCode);
        expect(res.body).toHaveProperty(data.expected.messagePath, data.expected.message);
      });
    }

  });
});