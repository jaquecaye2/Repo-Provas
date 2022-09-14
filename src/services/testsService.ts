import { findByIdCategory } from "../repositories/categoriesRepository";
import { findByIdTeacherDiscipline } from "../repositories/teachersDisiplinesRepository";
import { insertTest } from "../repositories/testsRepository";
import { TypeTestData } from "../types/testTypes";

export async function createTestService(test: TypeTestData) {
  // buscar no banco de dados se a categoria passada é valida
  if (!test.categoryId) {
    throw {
      code: "Unauthorized",
      message: "Informe uma categoria válida",
    };
  }

  const findCategory = await findByIdCategory(test.categoryId);

  if (!findCategory) {
    throw {
      code: "Unauthorized",
      message: "Informe uma categoria válida",
    };
  }

  // buscar no banco de dados se o id da disciplina/professor é valido
  if (!test.teacherDisciplineId) {
    throw {
      code: "Unauthorized",
      message: "Informe uma chave adequada para o professor e disciplina",
    };
  }

  const findTeacherDiscipline = await findByIdTeacherDiscipline(test.teacherDisciplineId);

  if (!findTeacherDiscipline) {
    throw {
      code: "Unauthorized",
      message: "Informe uma chave adequada para o professor e disciplina",
    };
  }

  // cadastrar a prova no banco de dados

  await insertTest(test)

  return "success";
}
