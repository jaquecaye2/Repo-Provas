import { Request, Response } from "express";

import { TypeTestData } from "../types/testTypes";
import {
  createTestService,
  showAllTeachers,
  showDisciplinesService,
  showTermsService,
  showTestsService,
  showTestsByTeacherService
} from "../services/testsService";

export async function createTest(request: Request, response: Response) {
  const test: TypeTestData = request.body;

  const success = await createTestService(test);

  if (success === "success") {
    return response.status(201).send("Prova criada com sucesso");
  }

  response.status(500).send();
}

export async function showTerms(request: Request, response: Response) {
  const result = await showTermsService();

  if (result) {
    return response.status(200).send(result);
  }

  response.status(500).send();
}

export async function showDisciplines(request: Request, response: Response) {
  const idTerm = Number(request.params.idTerm);

  const result = await showDisciplinesService(idTerm);

  if (result) {
    return response.status(200).send(result);
  }

  response.status(500).send();
}

export async function showTests(request: Request, response: Response) {
  const idDiscipline = Number(request.params.idDiscipline)

  const result = await showTestsService(idDiscipline);

  if (result) {
    return response.status(200).send(result);
  }

  response.status(500).send();
}

export async function showTeachers(request: Request, response: Response) {
  const result = await showAllTeachers();

  if (result) {
    return response.status(200).send(result);
  }

  response.status(500).send();
}

export async function showTestsByTeacher(request: Request, response: Response) {
  const idTeacher = Number(request.params.idTeacher)

  const result = await showTestsByTeacherService(idTeacher);

  if (result) {
    return response.status(200).send(result);
  }

  response.status(500).send();
}
