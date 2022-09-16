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
exports.showTestsByTeacher = exports.showTeachers = exports.showTestsByDiscipline = exports.showDisciplines = exports.showTerms = exports.createTest = void 0;
const testsService_1 = require("../services/testsService");
function createTest(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const test = request.body;
        const success = yield (0, testsService_1.createTestService)(test);
        if (success === "success") {
            return response.status(201).send("Prova criada com sucesso");
        }
        response.status(500).send();
    });
}
exports.createTest = createTest;
function showTerms(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, testsService_1.showTermsService)();
        if (result) {
            return response.status(200).send(result);
        }
        response.status(500).send();
    });
}
exports.showTerms = showTerms;
function showDisciplines(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const idTerm = Number(request.params.idTerm);
        const result = yield (0, testsService_1.showDisciplinesService)(idTerm);
        if (result) {
            return response.status(200).send(result);
        }
        response.status(500).send();
    });
}
exports.showDisciplines = showDisciplines;
function showTestsByDiscipline(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const idDiscipline = Number(request.params.idDiscipline);
        const result = yield (0, testsService_1.showTestsByDisciplineService)(idDiscipline);
        if (result) {
            return response.status(200).send(result);
        }
        response.status(500).send();
    });
}
exports.showTestsByDiscipline = showTestsByDiscipline;
function showTeachers(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, testsService_1.showAllTeachers)();
        if (result) {
            return response.status(200).send(result);
        }
        response.status(500).send();
    });
}
exports.showTeachers = showTeachers;
function showTestsByTeacher(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const idTeacher = Number(request.params.idTeacher);
        const result = yield (0, testsService_1.showTestsByTeacherService)(idTeacher);
        if (result) {
            return response.status(200).send(result);
        }
        response.status(500).send();
    });
}
exports.showTestsByTeacher = showTestsByTeacher;
