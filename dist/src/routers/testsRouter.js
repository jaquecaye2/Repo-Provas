"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testsController_1 = require("../controllers/testsController");
const validateSchema_1 = require("../middlewares/validateSchema");
const validateUser_1 = __importDefault(require("../middlewares/validateUser"));
const testSchema_1 = __importDefault(require("../schemas/testSchema"));
const router = (0, express_1.Router)();
router.post("/tests", validateUser_1.default, (0, validateSchema_1.validateSchema)(testSchema_1.default), testsController_1.createTest);
router.get("/tests/term", validateUser_1.default, testsController_1.showTerms);
router.get("/tests/term/:idTerm", validateUser_1.default, testsController_1.showDisciplines);
router.get("/tests/discipline/:idDiscipline", validateUser_1.default, testsController_1.showTestsByDiscipline);
router.get("/tests/teacher", validateUser_1.default, testsController_1.showTeachers);
router.get("/tests/teacher/:idTeacher", validateUser_1.default, testsController_1.showTestsByTeacher);
exports.default = router;
