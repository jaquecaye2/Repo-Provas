import { Router } from "express";

import { createTest } from "../controllers/testsController";
import { validateSchema } from "../middlewares/validateSchema";
import validateUser from "../middlewares/validateUser";
import testSchema from "../schemas/testSchema";

const router = Router();

router.post("/test", validateUser, validateSchema(testSchema), createTest);

export default router
