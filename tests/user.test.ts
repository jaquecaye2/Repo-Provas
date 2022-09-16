import supertest from "supertest";
import app from "../src/app";
import userFactory from "./factories/userFactory"
import userFalseFactory from "./factories/userFalseFactory"
import { prisma } from '../src/config/database';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users"`;
});

describe("Testa POST /signup", () => {
  it("Deve retornar status 201 se cadastrado uma usuário no formato correto", async () => {
    const user = await userFactory()

    const result = await supertest(app).post("/signup").send(user)

    expect(result.status).toBe(201)
  });

  it("Deve retornar status 401 ao tentar cadastrar um usuário com e-mail já registrado", async () => {
    const user = await userFactory()

    await supertest(app).post("/signup").send(user)
    const result = await supertest(app).post("/signup").send(user)

    expect(result.status).toBe(401)
  });

  it("Deve retornar status 422 ao tentar cadastrar um body no formato inválido", async () => {
    const user = await userFalseFactory()

    const result = await supertest(app).post("/signup").send(user)

    expect(result.status).toBe(422)
  });
});

describe("Testa POST /signin", () => {
  it("Deve retornar status 200 e um token válido, se logado com sucesso", async () => {
    const user = await userFactory()

    await supertest(app).post("/signup").send(user)

    const result = await supertest(app).post("/signin").send(user)

    expect(result.status).toBe(200)
    expect(result.text).not.toBeNull()
  });

  it("Deve retornar status 401 ao tentar logar com email ou senha incorretos", async () => {
    const user = await userFactory()

    const result = await supertest(app).post("/signin").send(user)

    expect(result.status).toBe(401)
  });

  it("Deve retornar status 422 ao tentar logar com um body no formato inválido", async () => {
    const user = await userFalseFactory()

    const result = await supertest(app).post("/signin").send(user)

    expect(result.status).toBe(422)
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});