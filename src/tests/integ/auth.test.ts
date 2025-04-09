import request from "supertest";
import app from "../../index";
import User from "../../models/user";

describe("Authentication all route tests.", () => {
  const now = new Date();
  const maxTimeTest = 1000 * 60 * 3;
  const dataSignUpTest = [
    {
      input: new User(
        "testapprouved" + Math.floor(Math.random() * 1000000) + "@example.com",
        "ValidPass1!",
        "pedro",
        "toto",
        now,
      ),
      expected: {
        message: "User created successfully",
        responseCode: 201,
        messagePath: "message",
      },
      itTitle: "Should register a new owner.",
    },
    {
      input: new User(
        "testbadpassword" +
          Math.floor(Math.random() * 1000000) +
          "@example.com",
        "short",
        "pedro",
        "toto",
        now,
      ),
      expected: {
        message:
          "Error during registration :The password must be at least 8 characters long.",
        responseCode: 400,
        messagePath: "error",
      },
      itTitle: "Should reject a registration with a short password.",
    },
    {
      input: new User(
        "forgottenInformation" +
          Math.floor(Math.random() * 1000000) +
          "@example.com",
        "ValidPass1!",
        "pedro",
        "toto",
      ),
      expected: {
        message: "Error during registration :missing registration information",
        responseCode: 400,
        messagePath: "error",
      },
      itTitle: "Should reject a registration with a missing information.",
    },
  ];

  const dataSignInTest = [
    {
      input: new User(
        dataSignUpTest[0].input.getMail(),
        dataSignUpTest[0].input.getPassword(),
      ),
      expected: {
        message: "User connected successfully",
        responseCode: 200,
        messagePath: "message",
      },
      itTitle: "Should connect user.",
    },
    {
      input: new User(
        dataSignUpTest[0].input.getMail() + "unknown",
        dataSignUpTest[0].input.getPassword(),
      ),
      expected: {
        message: "Error during connection :Unkown user",
        responseCode: 401,
        messagePath: "error",
      },
      itTitle: "Should reject a connection because the user is unkown.",
    },
    {
      input: new User(dataSignUpTest[0].input.getMail()),
      expected: {
        message: "Error during connection :missing information",
        responseCode: 401,
        messagePath: "error",
      },
      itTitle: "Should reject a connection with a missing information.",
    },
    {
      input: new User(dataSignUpTest[0].input.getMail(), "wrongPassword123"),
      expected: {
        message: "Error during connection :Invalid password",
        responseCode: 401,
        messagePath: "error",
      },
      itTitle: "Should reject a connection because the password is not valid.",
    },
  ];

  describe("Sing up", () => {
    for (const dataSignUp of dataSignUpTest) {
      let data = JSON.parse(JSON.stringify(dataSignUp));
      it(
        data.itTitle,
        async () => {
          const res = await request(app).post("/auth/signup").send(data.input);
          expect(res.statusCode).toEqual(data.expected.responseCode);
          expect(res.body).toHaveProperty(
            data.expected.messagePath,
            data.expected.message,
          );
        },
        maxTimeTest,
      );
    }

    it("Should reject a registration with an already exist email.", async () => {
      const userAlreadyExist = new User(
        "tesAlreadyExist" +
          Math.floor(Math.random() * 1000000) +
          "@example.com",
        "ValidPass1!",
        "pedro",
        "toto",
        now,
      );
      const originalRes = await request(app)
        .post("/auth/signup")
        .send(userAlreadyExist);

      const res = await request(app)
        .post("/auth/signup")
        .send(userAlreadyExist);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty(
        "error",
        "Error during registration :Email already exists",
      );
    });
  });

  describe("Sign in", () => {
    for (const dataSignIn of dataSignInTest) {
      let data = JSON.parse(JSON.stringify(dataSignIn));
      it(data.itTitle, async () => {
        const res = await request(app).post("/auth/signin").send(data.input);
        expect(res.statusCode).toEqual(data.expected.responseCode);
        expect(res.body).toHaveProperty(
          data.expected.messagePath,
          data.expected.message,
        );
      });
    }
  });
});
