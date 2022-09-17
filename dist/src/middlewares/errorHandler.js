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
function errorHandler(error, request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (error.code === "NotFound") {
            return response.status(404).send(error.message);
        }
        else if (error.code === "Unauthorized") {
            return response.status(401).send(error.message);
        }
        else if (error.code === "Unprocessable") {
            return response.status(422).send(error.message);
        }
        response.sendStatus(500);
    });
}
exports.default = errorHandler;
