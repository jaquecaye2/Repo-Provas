import { prisma } from "../config/database";

export async function findByIdTeacherDiscipline(id: number) {
  const result = await prisma.teacherDisciplines.findUnique({ where: { id } });
  return result;
}
