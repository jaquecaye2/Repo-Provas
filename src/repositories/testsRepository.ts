import { prisma } from "../config/database";

import { TypeTestData } from "../types/testTypes";

export async function insertTest(testData: TypeTestData) {
  await prisma.tests.create({ data: testData });
}

export async function findAllTerms() {
  const result = await prisma.terms.findMany();
  return result;
}

export async function findAllTeachers() {
  const result = await prisma.teachers.findMany();
  return result;
}

export async function findDisciplinesByTermId(termId: number) {
  const result = await prisma.disciplines.findMany({
    where: { termId: termId },
  });
  return result;
}

export async function findTestsByCategoryId(idCategory: number) {
  const result = await prisma.tests.findMany({
    where: {
      categoryId: idCategory,
    },
  });

  return result;
}

export async function findTestsByDisciplineId(idDiscipline: number) {
  const result = await prisma.teacherDisciplines.findMany({
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
}

export async function findTestsByTeacherId(idTeacher: number) {
  const result = await prisma.teacherDisciplines.findMany({
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
}

export async function findByIdCategory(id: number) {
  const result = await prisma.categories.findUnique({ where: { id } });
  return result;
}

export async function findByIdTeacherDiscipline(id: number) {
  const result = await prisma.teacherDisciplines.findUnique({ where: { id } });
  return result;
}
