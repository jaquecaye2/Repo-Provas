"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const faker_1 = require("@faker-js/faker");
const database_1 = require("../src/config/database");
const testFactory_1 = __importDefault(require("./factories/testFactory"));
const userFactory_1 = __importDefault(require("./factories/userFactory"));
const testFalseFactory_1 = require("./factories/testFalseFactory");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.$executeRaw `TRUNCATE TABLE "tests"`;
}));
function createAndLoginUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, userFactory_1.default)();
        yield (0, supertest_1.default)(app_1.default).post("/signup").send(user);
        const resultToken = yield (0, supertest_1.default)(app_1.default).post("/signin").send(user);
        const token = resultToken.text;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        return config.headers;
    });
}
describe("Testa POST /tests", () => {
    it("Deve retornar 201, se cadastrado uma prova no formato correto", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield createAndLoginUser();
        const test = yield (0, testFactory_1.default)();
        const result = yield (0, supertest_1.default)(app_1.default)
            .post("/tests")
            .send(test)
            .set(token);
        expect(result.status).toBe(201);
    }));
    it("Deve retornar status 401 ao tentar cadastrar uma prova e não enviar um token corretamente no header", () => __awaiter(void 0, void 0, void 0, function* () {
        const test = yield (0, testFactory_1.default)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/tests").send(test);
        expect(result.status).toBe(401);
    }));
    it("Deve retornar status 422 ao tentar cadastrar um body no formato inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield createAndLoginUser();
        const test = yield (0, testFalseFactory_1.TestIncorrectURLFactory)();
        const result = yield (0, supertest_1.default)(app_1.default)
            .post("/tests")
            .send(test)
            .set(token);
        expect(result.status).toBe(422);
    }));
    it("Deve retornar status 404 caso o id da categoria ou da relação professor-disciplina inserida no body não exista", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield createAndLoginUser();
        const test = yield (0, testFalseFactory_1.TestIncorrectIdsFactory)();
        const result = yield (0, supertest_1.default)(app_1.default)
            .post("/tests")
            .send(test)
            .set(token);
        expect(result.status).toBe(404);
    }));
});
describe("Testa GET /tests/term", () => {
    it("Deve retornar status 200 e o body no formato de Array", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield createAndLoginUser();
        const result = yield (0, supertest_1.default)(app_1.default).get("/tests/term").set(token);
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    }));
    it("Deve retornar status 401 ao tentar acessar os dados e não enviar um token corretamente no header", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get("/tests/term");
        expect(result.status).toBe(401);
    }));
});
describe("Testa GET /tests/term/:idTerm", () => {
    it("Deve retornar status 200 e o body no formato de Array", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield createAndLoginUser();
        const id = Number(faker_1.faker.finance.amount(1, 6, 0));
        const result = yield (0, supertest_1.default)(app_1.default)
            .get(`/tests/term/${id}`)
            .set(token);
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    }));
    it("Deve retornar status 404 caso o id do período(idTerm) inserido na url não exista", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield createAndLoginUser();
        const id = 999999999999999;
        const result = yield (0, supertest_1.default)(app_1.default)
            .get(`/tests/term/${id}`)
            .set(token);
        expect(result.status).toBe(404);
    }));
    it("Deve retornar status 401 ao tentar acessar os dados e não enviar um token corretamente no header", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get("/tests/term/13");
        expect(result.status).toBe(401);
    }));
});
describe("Testa GET /tests/discipline/:idDiscipline", () => {
    it("Deve retornar status 200 e o body no formato de Array", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield createAndLoginUser();
        const id = Number(faker_1.faker.finance.amount(1, 6, 0));
        const result = yield (0, supertest_1.default)(app_1.default)
            .get(`/tests/discipline/${id}`)
            .set(token);
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    }));
    it("Deve retornar status 404 caso o id da disciplina inserido na url não exista", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield createAndLoginUser();
        const id = 999999999999999;
        const result = yield (0, supertest_1.default)(app_1.default)
            .get(`/tests/discipline/${id}`)
            .set(token);
        expect(result.status).toBe(404);
    }));
    it("Deve retornar status 401 ao tentar acessar os dados e não enviar um token corretamente no header", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get("/tests/discipline/9");
        expect(result.status).toBe(401);
    }));
});
describe("Testa GET /tests/teacher", () => {
    it("Deve retornar status 200 e o body no formato de Array", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield createAndLoginUser();
        const result = yield (0, supertest_1.default)(app_1.default).get("/tests/teacher").set(token);
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    }));
    it("Deve retornar status 401 ao tentar acessar os dados e não enviar um token corretamente no header", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get("/tests/teacher");
        expect(result.status).toBe(401);
    }));
});
describe("Testa GET /tests/teacher/:idTeacher", () => {
    it("Deve retornar status 200 e o body no formato de Array", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield createAndLoginUser();
        const id = Number(faker_1.faker.finance.amount(1, 2, 0));
        const result = yield (0, supertest_1.default)(app_1.default)
            .get(`/tests/teacher/${id}`)
            .set(token);
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    }));
    it("Deve retornar status 404 caso o id da disciplina inserido na url não exista", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield createAndLoginUser();
        const id = 999999999999999;
        const result = yield (0, supertest_1.default)(app_1.default)
            .get(`/tests/teacher/${id}`)
            .set(token);
        expect(result.status).toBe(404);
    }));
    it("Deve retornar status 401 ao tentar acessar os dados e não enviar um token corretamente no header", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get("/tests/teacher/5");
        expect(result.status).toBe(401);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.$disconnect();
}));
