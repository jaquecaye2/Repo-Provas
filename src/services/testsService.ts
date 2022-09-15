import {
  findAllTerms,
  findDisciplinesByTermId,
  insertTest,
  findByIdTeacherDiscipline,
  findByIdCategory,
  findTestsByDisciplineId,
  findAllTeachers,
  findTestsByTeacherId
} from "../repositories/testsRepository";
import { TypeTestData } from "../types/testTypes";

export async function createTestService(test: TypeTestData) {
  // buscar no banco de dados se a categoria passada é valida
  if (!test.categoryId) {
    throw {
      code: "NotFound",
      message: "Informe uma categoria válida",
    };
  }

  const findCategory = await findByIdCategory(test.categoryId);

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

  const findTeacherDiscipline = await findByIdTeacherDiscipline(
    test.teacherDisciplineId
  );

  if (!findTeacherDiscipline) {
    throw {
      code: "NotFound",
      message: "Informe uma chave adequada para o professor e disciplina",
    };
  }

  // cadastrar a prova no banco de dados

  await insertTest(test);

  return "success";
}

export async function showTermsService() {
  const result = await findAllTerms();
  return result;
}

export async function showDisciplinesService(idTerm: number) {
  const result = await findDisciplinesByTermId(idTerm);

  if (result.length === 0) {
    throw {
      code: "NotFound",
      message: "Informe um periodo válido",
    };
  }

  return result;
}

export async function showTestsService(idDiscipline: number) {
  const result = await findTestsByDisciplineId(idDiscipline);
  return result;
}

export async function showAllTeachers() {
  const result = await findAllTeachers();
  return result;
}

export async function showTestsByTeacherService(idTeacher: number) {
  const result = await findTestsByTeacherId(idTeacher);
  return result;
}
