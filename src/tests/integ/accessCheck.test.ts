import User from "../../models/user";
import request from "supertest";
import app from "../../index";
import { string } from "zod";
import { rolesPermissions } from "../../config/rolesPermissions";

<<<<<<< HEAD

const tokens: { [key: string]: String } = {
  owner: "",
  tenant: "",
};

describe("access check", () => {
=======
//beforeAll(async () => await new Promise(resolve => setTimeout(resolve, 5000)));
const tokens: { [key: string]: String } = {
  owner: "",
  tenant: "",
};
describe("access check", () => {
<<<<<<< HEAD

>>>>>>> b2056da (Feat: aic-54 token with test)
=======
>>>>>>> 4e51096 (chore: prettier)
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
=======
      expect(signupRes.status).toBe(201);

      const signinRes = await request(app).post("/auth/signin").send(user);
>>>>>>> b2056da (Feat: aic-54 token with test)
      expect(signinRes.status).toBe(200);

      const userType = user.getType();
      if (userType) {
        tokens[userType] = signinRes.body.token as String;
      } else {
        console.error("User  type is undefined for user:", user);
      }
    }
<<<<<<< HEAD
<<<<<<< HEAD
  });
=======
  })
>>>>>>> b2056da (Feat: aic-54 token with test)
=======
  });
>>>>>>> 4e51096 (chore: prettier)

  describe("All access check tests.", () => {
    Object.entries(tokens).forEach(([roleName]) => {
      describe(`${roleName}`, () => {
        for (const [role, permissions] of Object.entries(rolesPermissions)) {
          describe(`Test with right of ${role}`, () => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4e51096 (chore: prettier)
            testByAllFunction(
              roleName,
              permissions,
              roleName != role && role != "everyone",
            );
<<<<<<< HEAD
          });
        }
      });
    });
  });

  it("Should reject a request without token", async () => {
    const res = await request(app).post("/access/check").send({
      rightName: "access",
    });
    expect(res.body).toHaveProperty("error", "Error during access check :Token is missing");
    expect(res.statusCode).toEqual(401);
  });
  it("Should reject a request without rightName", async () => {
    const res = await request(app).post("/access/check").send({
      token: tokens["owner"],
    });
    expect(res.body).toHaveProperty("error", "Error during access check :Right name is missing");
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
=======
            testByAllFunction(roleName, permissions, (roleName != role) && (role != "everyone"));
=======
>>>>>>> 4e51096 (chore: prettier)
          });
        }
      });
    });
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
<<<<<<< HEAD
      const res = await request(app).post("/access/check").send({ token, rightName });
>>>>>>> b2056da (Feat: aic-54 token with test)
=======
      const res = await request(app)
        .post("/access/check")
        .send({ token, rightName });
>>>>>>> 4e51096 (chore: prettier)
      if (shouldFail) {
        expect(res.statusCode).toEqual(403);
        expect(res.body).toHaveProperty("message", "Access denied");
        return;
      }
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Access granted");
    });
  }
<<<<<<< HEAD
<<<<<<< HEAD
}
=======
}
>>>>>>> b2056da (Feat: aic-54 token with test)
=======
}
>>>>>>> 4e51096 (chore: prettier)
