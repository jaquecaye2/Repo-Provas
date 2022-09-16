import { Router } from "express";

import { createTest, showTerms, showDisciplines, showTeachers, showTestsByTeacher, showTestsByDiscipline } from "../controllers/testsController";
import { validateSchema } from "../middlewares/validateSchema";
import validateUser from "../middlewares/validateUser";
import testSchema from "../schemas/testSchema";

const router = Router();

router.post("/tests", validateUser, validateSchema(testSchema), createTest);

router.get("/tests/term", validateUser, showTerms)

router.get("/tests/term/:idTerm", validateUser, showDisciplines)

router.get("/tests/discipline/:idDiscipline", validateUser, showTestsByDiscipline)

router.get("/tests/teacher", validateUser, showTeachers)

router.get("/tests/teacher/:idTeacher", validateUser, showTestsByTeacher)

export default router
