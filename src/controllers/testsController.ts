import { Request, Response } from "express";

import { TypeTestData } from "../types/testTypes";
import { createTestService } from "../services/testsService";
import { users } from "@prisma/client";

export async function createTest(request: Request, response: Response) {
  const test: TypeTestData = request.body;

  const success = await createTestService(test);

  if (success === "success") {
    return response.status(201).send("Prova criada com sucesso");
  }

  response.status(500).send();
}
