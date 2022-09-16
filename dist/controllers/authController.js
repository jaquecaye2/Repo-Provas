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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signin = exports.signup = void 0;
const usersService_1 = require("../services/usersService");
function signup(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = request.body;
        const success = yield (0, usersService_1.createUser)(user);
        if (success === "success") {
            return response.status(200).send("Usuário criado com sucesso");
        }
        response.status(500).send();
    });
}
exports.signup = signup;
function signin(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = request.body;
        const token = yield (0, usersService_1.loginUser)(user);
        if (token) {
            return response.status(200).send(token);
        }
        response.status(500).send();
    });
}
exports.signin = signin;
function logout(request, response) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.logout = logout;
