import {
  findAllTerms,
  findDisciplinesByTermId,
  insertTest,
  findTestsByDisciplineId,
  findAllTeachers,
  findTestsByTeacherId,
  findDisciplineById,
  findTeacherById,
  findTeacherDisciplineById,
  findCategoryById,
  findTermById,
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

  const findCategory = await findCategoryById(test.categoryId);

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

  const findTeacherDiscipline = await findTeacherDisciplineById(
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

  const findTerm = await findTermById(idTerm)

  if(!findTerm){
    throw {
      code: "NotFound",
      message: "Informe um periodo válido",
    };
  }

  const result = await findDisciplinesByTermId(idTerm);

  return result;
}

export async function showTestsByDisciplineService(idDiscipline: number) {
  const findDiscipline = await findDisciplineById(idDiscipline);

  if (!findDiscipline) {
    throw {
      code: "NotFound",
      message: "Informe uma disciplina válida",
    };
  }

  const result = await findTestsByDisciplineId(idDiscipline);

  const tests = result[0].tests;
  const teacher = result[0].teachers?.name;

  const projectsData = [];
  const practiceData = [];
  const recoveryData = [];

  for (let i = 0; i < tests.length; i++) {
    const name = tests[i].name;
    const pdfUrl = tests[i].pdfUrl;
    const category = tests[i].categories?.name;

    if (category === "Projeto") {
      projectsData.push({
        name,
        pdfUrl,
        teacher: teacher,
      });
    } else if (category === "Prática") {
      practiceData.push({
        name,
        pdfUrl,
        teacher: teacher,
      });
    } else if (category === "Recuperação") {
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
}

export async function showAllTeachers() {
  const result = await findAllTeachers();
  return result;
}

export async function showTestsByTeacherService(idTeacher: number) {
  const findTeacher = await findTeacherById(idTeacher);

  if (!findTeacher) {
    throw {
      code: "NotFound",
      message: "Informe um professor válido",
    };
  }

  const result = await findTestsByTeacherId(idTeacher);

  const disciplines = [];
  const tests = [];

  for (let i = 0; i < result.length; i++) {
    disciplines.push(result[i].disciplines?.name);
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
      const category = tests[i][j].categories?.name;

      if (category === "Projeto") {
        projectsData.push({
          name,
          pdfUrl,
          discipline,
        });
      } else if (category === "Prática") {
        practiceData.push({
          name,
          pdfUrl,
          discipline,
        });
      } else if (category === "Recuperação") {
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
}
