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
exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const usersRepository_1 = require("../repositories/usersRepository");
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = user.email;
        const compareEmail = yield (0, usersRepository_1.findByEmail)(email);
        if (compareEmail) {
            throw {
                code: "Unauthorized",
                message: "Email already registered",
            };
        }
        const salt = 10;
        const password_hash = bcrypt_1.default.hashSync(user.password, salt);
        const userData = {
            email,
            password: password_hash,
        };
        yield (0, usersRepository_1.insertUser)(userData);
        return "success";
    });
}
exports.createUser = createUser;
function loginUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        const email = user.email;
        const findUser = yield (0, usersRepository_1.findByEmail)(email);
        if (!findUser) {
            throw {
                code: "Unauthorized",
                message: "E-mail or password incorrect",
            };
        }
        const passwordVerify = bcrypt_1.default.compareSync(user.password, findUser.password);
        if (!passwordVerify) {
            throw {
                code: "Unauthorized",
                message: "E-mail or password incorrect",
            };
        }
        const iduser = findUser.id;
        const secretKey = process.env.SECRET_KEY || "";
        const config = { expiresIn: 86400 };
        const token = jsonwebtoken_1.default.sign({ id: iduser }, secretKey, config);
        return token;
    });
}
exports.loginUser = loginUser;
