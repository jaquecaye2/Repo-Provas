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
exports.findTestsByTeacherId = exports.findTestsByDisciplineId = exports.findTestsByCategoryId = exports.findDisciplinesByTermId = exports.findTeacherById = exports.findTermById = exports.findDisciplineById = exports.findTeacherDisciplineById = exports.findCategoryById = exports.findAllTeachers = exports.findAllTerms = exports.insertTest = void 0;
const database_1 = require("../config/database");
function insertTest(testData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.tests.create({ data: testData });
    });
}
exports.insertTest = insertTest;
function findAllTerms() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.terms.findMany();
        return result;
    });
}
exports.findAllTerms = findAllTerms;
function findAllTeachers() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.teachers.findMany();
        return result;
    });
}
exports.findAllTeachers = findAllTeachers;
function findCategoryById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.categories.findUnique({ where: { id } });
        return result;
    });
}
exports.findCategoryById = findCategoryById;
function findTeacherDisciplineById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.teacherDisciplines.findUnique({ where: { id } });
        return result;
    });
}
exports.findTeacherDisciplineById = findTeacherDisciplineById;
function findDisciplineById(idDiscipline) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.disciplines.findUnique({
            where: {
                id: idDiscipline,
            }
        });
        return result;
    });
}
exports.findDisciplineById = findDisciplineById;
function findTermById(idTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.terms.findUnique({
            where: {
                id: idTerm,
            }
        });
        return result;
    });
}
exports.findTermById = findTermById;
function findTeacherById(idTeacher) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.teachers.findUnique({
            where: {
                id: idTeacher,
            }
        });
        return result;
    });
}
exports.findTeacherById = findTeacherById;
function findDisciplinesByTermId(termId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.disciplines.findMany({
            where: { termId: termId },
        });
        return result;
    });
}
exports.findDisciplinesByTermId = findDisciplinesByTermId;
function findTestsByCategoryId(idCategory) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.tests.findMany({
            where: {
                categoryId: idCategory,
            },
        });
        return result;
    });
}
exports.findTestsByCategoryId = findTestsByCategoryId;
function findTestsByDisciplineId(idDiscipline) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.teacherDisciplines.findMany({
            where: {
                disciplineId: idDiscipline,
            },
            include: {
                tests: {
                    include: {
                        categories: true,
                    },
                },
                teachers: true,
            },
        });
        return result;
    });
}
exports.findTestsByDisciplineId = findTestsByDisciplineId;
function findTestsByTeacherId(idTeacher) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.teacherDisciplines.findMany({
            where: {
                teacherId: idTeacher,
            },
            include: {
                tests: {
                    include: {
                        categories: true,
                    },
                },
                disciplines: true,
            },
        });
        return result;
    });
}
exports.findTestsByTeacherId = findTestsByTeacherId;
