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
exports.showTestsByTeacherService = exports.showAllTeachers = exports.showTestsByDisciplineService = exports.showDisciplinesService = exports.showTermsService = exports.createTestService = void 0;
const testsRepository_1 = require("../repositories/testsRepository");
function createTestService(test) {
    return __awaiter(this, void 0, void 0, function* () {
        // buscar no banco de dados se a categoria passada é valida
        if (!test.categoryId) {
            throw {
                code: "NotFound",
                message: "Informe uma categoria válida",
            };
        }
        const findCategory = yield (0, testsRepository_1.findCategoryById)(test.categoryId);
        if (!findCategory) {
            throw {
                code: "NotFound",
                message: "Informe uma categoria válida",
            };
        }
        // buscar no banco de dados se o id da disciplina/professor é valido
        if (!test.teacherDisciplineId) {
            throw {
                code: "NotFound",
                message: "Informe uma chave adequada para o professor e disciplina",
            };
        }
        const findTeacherDiscipline = yield (0, testsRepository_1.findTeacherDisciplineById)(test.teacherDisciplineId);
        if (!findTeacherDiscipline) {
            throw {
                code: "NotFound",
                message: "Informe uma chave adequada para o professor e disciplina",
            };
        }
        // cadastrar a prova no banco de dados
        yield (0, testsRepository_1.insertTest)(test);
        return "success";
    });
}
exports.createTestService = createTestService;
function showTermsService() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, testsRepository_1.findAllTerms)();
        return result;
    });
}
exports.showTermsService = showTermsService;
function showDisciplinesService(idTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        const findTerm = yield (0, testsRepository_1.findTermById)(idTerm);
        if (!findTerm) {
            throw {
                code: "NotFound",
                message: "Informe um periodo válido",
            };
        }
        const result = yield (0, testsRepository_1.findDisciplinesByTermId)(idTerm);
        return result;
    });
}
exports.showDisciplinesService = showDisciplinesService;
function showTestsByDisciplineService(idDiscipline) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const findDiscipline = yield (0, testsRepository_1.findDisciplineById)(idDiscipline);
        if (!findDiscipline) {
            throw {
                code: "NotFound",
                message: "Informe uma disciplina válida",
            };
        }
        const result = yield (0, testsRepository_1.findTestsByDisciplineId)(idDiscipline);
        const tests = result[0].tests;
        const teacher = (_a = result[0].teachers) === null || _a === void 0 ? void 0 : _a.name;
        const projectsData = [];
        const practiceData = [];
        const recoveryData = [];
        for (let i = 0; i < tests.length; i++) {
            const name = tests[i].name;
            const pdfUrl = tests[i].pdfUrl;
            const category = (_b = tests[i].categories) === null || _b === void 0 ? void 0 : _b.name;
            if (category === "Projeto") {
                projectsData.push({
                    name,
                    pdfUrl,
                    teacher: teacher,
                });
            }
            else if (category === "Prática") {
                practiceData.push({
                    name,
                    pdfUrl,
                    teacher: teacher,
                });
            }
            else if (category === "Recuperação") {
                recoveryData.push({
                    name,
                    pdfUrl,
                    teacher: teacher,
                });
            }
        }
        const data = [
            {
                category: "Projeto",
                tests: [...projectsData],
            },
            {
                category: "Prática",
                tests: [...practiceData],
            },
            {
                category: "Recuperação",
                tests: [...recoveryData],
            },
        ];
        return data;
    });
}
exports.showTestsByDisciplineService = showTestsByDisciplineService;
function showAllTeachers() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, testsRepository_1.findAllTeachers)();
        return result;
    });
}
exports.showAllTeachers = showAllTeachers;
function showTestsByTeacherService(idTeacher) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const findTeacher = yield (0, testsRepository_1.findTeacherById)(idTeacher);
        if (!findTeacher) {
            throw {
                code: "NotFound",
                message: "Informe um professor válido",
            };
        }
        const result = yield (0, testsRepository_1.findTestsByTeacherId)(idTeacher);
        const disciplines = [];
        const tests = [];
        for (let i = 0; i < result.length; i++) {
            disciplines.push((_a = result[i].disciplines) === null || _a === void 0 ? void 0 : _a.name);
            tests.push(result[i].tests);
        }
        const dataFinal = [];
        for (let i = 0; i < tests.length; i++) {
            const discipline = disciplines[i];
            const projectsData = [];
            const practiceData = [];
            const recoveryData = [];
            for (let j = 0; j < tests[i].length; j++) {
                const name = tests[i][j].name;
                const pdfUrl = tests[i][j].pdfUrl;
                const category = (_b = tests[i][j].categories) === null || _b === void 0 ? void 0 : _b.name;
                if (category === "Projeto") {
                    projectsData.push({
                        name,
                        pdfUrl,
                        discipline,
                    });
                }
                else if (category === "Prática") {
                    practiceData.push({
                        name,
                        pdfUrl,
                        discipline,
                    });
                }
                else if (category === "Recuperação") {
                    recoveryData.push({
                        name,
                        pdfUrl,
                        discipline,
                    });
                }
            }
            const data = [
                {
                    category: "Projeto",
                    tests: [...projectsData],
                },
                {
                    category: "Prática",
                    tests: [...practiceData],
                },
                {
                    category: "Recuperação",
                    tests: [...recoveryData],
                },
            ];
            dataFinal.push({
                discipline,
                tests: [...data],
            });
        }
        return dataFinal;
    });
}
exports.showTestsByTeacherService = showTestsByTeacherService;
