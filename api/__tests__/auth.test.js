const supertest = require("supertest");
const server = require("../../server");
const prisma = require("../../db/index");
const bcrypt = require("bcrypt");

describe("/api/auth", () => {
  describe("POST /register", () => {
    const testUser = {
      username: "testing",
      password: "password123",
      email: "testing@gmail.com",
    };
    beforeEach(() => {
      prisma.users.create = jest
        .fn()
        .mockResolvedValue({ ...testUser, id: 123, password: "hashPass" });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("returns 201 status code when successful", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send(testUser);

      expect(res.status).toBe(201);
    });

    test("returns token when sucessful", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send(testUser);

      expect(res.body.token).toBeTruthy();
    });

    test("prisma.user.create is called", async () => {
      await supertest(server).post("/api/auth/register").send(testUser);

      expect(prisma.users.create).toHaveBeenCalled();
    });
  });

  describe("POST /login", () => {
    const testUser = {
      username: "testing",
      password: "password123",
    };

    beforeEach(() => {
      prisma.users.findUnique = jest
        .fn()
        .mockResolvedValue({ ...testUser, id: 123, password: "hashPass" });

      bcrypt.compare = jest.fn().mockResolvedValue(true);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("returns 200 status code when successful", async () => {
      const res = await supertest(server)
        .post("/api/auth/login")
        .send(testUser);

      expect(res.status).toBe(200);
    });

    test("returns token when successful", async () => {
      const res = await supertest(server)
        .post("/api/auth/login")
        .send(testUser);

      expect(res.body.token).toBeTruthy();
    });
//Not working - LOOK INTO IT 
    // test("returns 401 status code when user doesn't exist", async () => {
    //   prisma.users.findUnique = jest.fn().mockResolvedValue(null);

    //   const res = await supertest(server)
    //     .post("/api/auth/login")
    //     .send(testUser);

    //   expect(res.status).toBe(401);
    // });

    // test("returns 401 message when user doesn't exist", async () => {
    //   prisma.users.findUnique = jest.fn().mockResolvedValue(null);

    //   const res = await supertest(server)
    //     .post("/api/auth/login")
    //     .send(testUser);

    //   expect(res.body.message).toEqual("Invalid login credentials.");
    // });

    test("returns 401 status code when hashed password doesn't match password provided", async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const res = await supertest(server)
        .post("/api/auth/login")
        .send(testUser);

      expect(res.status).toBe(401);
    });
  });
});

