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
const usersRepository_1 = require("../repositories/usersRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
function validateUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        const { authorization } = request.headers;
        if (!authorization) {
            throw {
                code: "Unauthorized",
                message: "Missing authorization header",
            };
        }
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
        if (!token) {
            throw {
                code: "Unauthorized",
                message: "Login required",
            };
        }
        const secretKey = process.env.SECRET_KEY || "";
        try {
            const { id } = jsonwebtoken_1.default.verify(token, secretKey);
            const user = yield (0, usersRepository_1.findById)(id);
            response.locals.user = user;
            next();
        }
        catch (error) {
            throw {
                code: "Unauthorized",
                message: "Invalid token. Login required.",
            };
        }
    });
}
exports.default = validateUser;
