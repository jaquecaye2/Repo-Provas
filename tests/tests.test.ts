import supertest from "supertest";
import app from "../src/app";
import { faker } from "@faker-js/faker";
import { prisma } from "../src/config/database";
import TestFactory from "./factories/testFactory";
import userFactory from "./factories/userFactory";
import {
  TestIncorrectURLFactory,
  TestIncorrectIdsFactory,
} from "./factories/testFalseFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "tests"`;
});

describe("Testa POST /tests", () => {
  it("Deve retornar 201, se cadastrado uma prova no formato correto", async () => {
    // create and login user
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    const resultToken = await supertest(app).post("/signin").send(user);
    const token = resultToken.text;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // create test
    const test = await TestFactory();
    const result = await supertest(app)
      .post("/tests")
      .send(test)
      .set(config.headers);

    expect(result.status).toBe(201);
  });

  it("Deve retornar status 401 ao tentar cadastrar uma prova e não enviar um token corretamente no header", async () => {
    // create test
    const test = await TestFactory();
    const result = await supertest(app).post("/tests").send(test);

    expect(result.status).toBe(401);
  });

  it("Deve retornar status 422 ao tentar cadastrar um body no formato inválido", async () => {
    // create and login user
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    const resultToken = await supertest(app).post("/signin").send(user);
    const token = resultToken.text;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // create test
    const test = await TestIncorrectURLFactory();
    const result = await supertest(app)
      .post("/tests")
      .send(test)
      .set(config.headers);

    expect(result.status).toBe(422);
  });

  it("Deve retornar status 404 caso o id da categoria ou da relação professor-disciplina inserida no body não exista", async () => {
    // create and login user
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    const resultToken = await supertest(app).post("/signin").send(user);
    const token = resultToken.text;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // create test
    const test = await TestIncorrectIdsFactory();
    const result = await supertest(app)
      .post("/tests")
      .send(test)
      .set(config.headers);

    expect(result.status).toBe(404);
  });
});

describe("Testa GET /tests/term", () => {
  it("Deve retornar status 200 e o body no formato de Array", async () => {
    // create and login user
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    const resultToken = await supertest(app).post("/signin").send(user);
    const token = resultToken.text;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // get terms
    const result = await supertest(app).get("/tests/term").set(config.headers);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("Deve retornar status 401 ao tentar acessar os dados e não enviar um token corretamente no header", async () => {
    // get terms
    const result = await supertest(app).get("/tests/term");
    expect(result.status).toBe(401);
  });
});

describe("Testa GET /tests/term/:idTerm", () => {
  it("Deve retornar status 200 e o body no formato de Array", async () => {
    // create and login user
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    const resultToken = await supertest(app).post("/signin").send(user);
    const token = resultToken.text;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // get disciplines
    const id = Number(faker.finance.amount(13, 18, 0));
    const result = await supertest(app)
      .get(`/tests/term/${id}`)
      .set(config.headers);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("Deve retornar status 404 caso o id do período(idTerm) inserido na url não exista", async () => {
    // create and login user
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    const resultToken = await supertest(app).post("/signin").send(user);
    const token = resultToken.text;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // get disciplines
    const id = 999999999999999;
    const result = await supertest(app)
      .get(`/tests/term/${id}`)
      .set(config.headers);
    expect(result.status).toBe(404);
  });

  it("Deve retornar status 401 ao tentar acessar os dados e não enviar um token corretamente no header", async () => {
    const result = await supertest(app).get("/tests/term/13");
    expect(result.status).toBe(401);
  });
});

describe("Testa GET /tests/discipline/:idDiscipline", () => {
  it("Deve retornar status 200 e o body no formato de Array", async () => {
    // create and login user
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    const resultToken = await supertest(app).post("/signin").send(user);
    const token = resultToken.text;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // get testes
    const id = Number(faker.finance.amount(9, 14, 0));
    const result = await supertest(app)
      .get(`/tests/discipline/${id}`)
      .set(config.headers);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("Deve retornar status 404 caso o id da disciplina inserido na url não exista", async () => {
    // create and login user
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    const resultToken = await supertest(app).post("/signin").send(user);
    const token = resultToken.text;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // get tests
    const id = 999999999999999;
    const result = await supertest(app)
      .get(`/tests/discipline/${id}`)
      .set(config.headers);
    expect(result.status).toBe(404);
  });

  it("Deve retornar status 401 ao tentar acessar os dados e não enviar um token corretamente no header", async () => {
    const result = await supertest(app).get("/tests/discipline/9");
    expect(result.status).toBe(401);
  });
});

describe("Testa GET /tests/teacher", () => {
  it("Deve retornar status 200 e o body no formato de Array", async () => {
    // create and login user
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    const resultToken = await supertest(app).post("/signin").send(user);
    const token = resultToken.text;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // get terms
    const result = await supertest(app).get("/tests/teacher").set(config.headers);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("Deve retornar status 401 ao tentar acessar os dados e não enviar um token corretamente no header", async () => {
    // get terms
    const result = await supertest(app).get("/tests/teacher");
    expect(result.status).toBe(401);
  });
});

describe("Testa GET /tests/teacher/:idTeacher", () => {
  it("Deve retornar status 200 e o body no formato de Array", async () => {
    // create and login user
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    const resultToken = await supertest(app).post("/signin").send(user);
    const token = resultToken.text;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // get tests
    const id = Number(faker.finance.amount(5, 6, 0));
    const result = await supertest(app)
      .get(`/tests/teacher/${id}`)
      .set(config.headers);
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("Deve retornar status 404 caso o id da disciplina inserido na url não exista", async () => {
    // create and login user
    const user = await userFactory();
    await supertest(app).post("/signup").send(user);
    const resultToken = await supertest(app).post("/signin").send(user);
    const token = resultToken.text;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // get tests
    const id = 999999999999999;
    const result = await supertest(app)
      .get(`/tests/teacher/${id}`)
      .set(config.headers);
    expect(result.status).toBe(404);
  });

  it("Deve retornar status 401 ao tentar acessar os dados e não enviar um token corretamente no header", async () => {
    const result = await supertest(app).get("/tests/teacher/5");
    expect(result.status).toBe(401);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
