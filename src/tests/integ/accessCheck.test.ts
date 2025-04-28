import User from "../../models/user";
import request from "supertest";
import app from "../../index";
import { string } from "zod";
import { rolesPermissions } from "../../config/rolesPermissions";

<<<<<<< HEAD
//beforeAll(async () => await new Promise(resolve => setTimeout(resolve, 5000)));
=======
>>>>>>> 754525f125c050157f630ecf5e7d74918a9ae82d
const tokens: { [key: string]: String } = {
  owner: "",
  tenant: "",
};
<<<<<<< HEAD
=======

>>>>>>> 754525f125c050157f630ecf5e7d74918a9ae82d
describe("access check", () => {
  beforeAll(async () => {
    const now = new Date();
    const users = [
      new User(
        "owneraccess" + Math.floor(Math.random() * 1000000) + "@example.com",
        "ValidPass1!",
        "pedro",
        "toto",
        now,
        "owner",
      ),
      new User(
        "tenantaccess" + Math.floor(Math.random() * 1000000) + "@example.com",
        "ValidPass1!",
        "pedro",
        "toto",
        now,
        "tenant",
      ),
    ];

    for (const user of users) {
      const signupRes = await request(app).post("/auth/signup").send(user);
<<<<<<< HEAD
      expect(signupRes.body).toHaveProperty("message", "User created successfully");
      expect(signupRes.status).toBe(201);

      const signinRes = await request(app).post("/auth/signin").send(user);
      expect(signinRes.body).toHaveProperty("message", "User connected successfully");
      expect(signinRes.status).toBe(200);
=======
      expect(signupRes.body).toHaveProperty(
        "message",
        "User created successfully",
      );
      expect(signupRes.status).toBe(201);

      const signinRes = await request(app).post("/auth/signin").send(user);
      expect(signinRes.body).toHaveProperty(
        "message",
        "User connected successfully",
      );
      expect(signupRes.status).toBe(201);
>>>>>>> 754525f125c050157f630ecf5e7d74918a9ae82d

      const userType = user.getType();
      if (userType) {
        tokens[userType] = signinRes.body.token as String;
      } else {
        console.error("User  type is undefined for user:", user);
      }
    }
  });

  describe("All access check tests.", () => {
    Object.entries(tokens).forEach(([roleName]) => {
      describe(`${roleName}`, () => {
        for (const [role, permissions] of Object.entries(rolesPermissions)) {
          describe(`Test with right of ${role}`, () => {
            testByAllFunction(
              roleName,
              permissions,
              roleName != role && role != "everyone",
            );
          });
        }
      });
    });
  });

  it("Should reject a request without token", async () => {
    const res = await request(app).post("/access/check").send({
      rightName: "access",
    });
<<<<<<< HEAD
    expect(res.body).toHaveProperty("error", "Error during access check :Token is missing");
=======
    expect(res.body).toHaveProperty(
      "error",
      "Error during access check :Token is missing",
    );
>>>>>>> 754525f125c050157f630ecf5e7d74918a9ae82d
    expect(res.statusCode).toEqual(401);
  });
  it("Should reject a request without rightName", async () => {
    const res = await request(app).post("/access/check").send({
      token: tokens["owner"],
    });
<<<<<<< HEAD
    expect(res.body).toHaveProperty("error", "Error during access check :Right name is missing");
=======
    expect(res.body).toHaveProperty(
      "error",
      "Error during access check :Right name is missing",
    );
>>>>>>> 754525f125c050157f630ecf5e7d74918a9ae82d
    expect(res.statusCode).toEqual(401);
  });
});

function testByAllFunction(
  roleName: String,
  rights: String[],
  shouldFail: boolean,
) {
  for (const rightName of rights) {
    it(`${rightName}`, async () => {
      const token = tokens[roleName.toString()];
      const res = await request(app)
        .post("/access/check")
        .send({ token, rightName });
      if (shouldFail) {
        expect(res.statusCode).toEqual(403);
        expect(res.body).toHaveProperty("message", "Access denied");
        return;
      }
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Access granted");
    });
  }
}
