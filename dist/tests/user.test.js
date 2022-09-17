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
const userFactory_1 = __importDefault(require("./factories/userFactory"));
const userFalseFactory_1 = __importDefault(require("./factories/userFalseFactory"));
const database_1 = require("../src/config/database");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.$executeRaw `TRUNCATE TABLE "users"`;
}));
describe("Testa POST /signup", () => {
    it("Deve retornar status 201 se cadastrado uma usuário no formato correto", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, userFactory_1.default)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/signup").send(user);
        expect(result.status).toBe(201);
    }));
    it("Deve retornar status 401 ao tentar cadastrar um usuário com e-mail já registrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, userFactory_1.default)();
        yield (0, supertest_1.default)(app_1.default).post("/signup").send(user);
        const result = yield (0, supertest_1.default)(app_1.default).post("/signup").send(user);
        expect(result.status).toBe(401);
    }));
    it("Deve retornar status 422 ao tentar cadastrar um body no formato inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, userFalseFactory_1.default)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/signup").send(user);
        expect(result.status).toBe(422);
    }));
});
describe("Testa POST /signin", () => {
    it("Deve retornar status 200 e um token válido, se logado com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, userFactory_1.default)();
        yield (0, supertest_1.default)(app_1.default).post("/signup").send(user);
        const result = yield (0, supertest_1.default)(app_1.default).post("/signin").send(user);
        expect(result.status).toBe(200);
        expect(result.text).not.toBeNull();
    }));
    it("Deve retornar status 401 ao tentar logar com email ou senha incorretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, userFactory_1.default)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/signin").send(user);
        expect(result.status).toBe(401);
    }));
    it("Deve retornar status 422 ao tentar logar com um body no formato inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, userFalseFactory_1.default)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/signin").send(user);
        expect(result.status).toBe(422);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.$disconnect();
}));
