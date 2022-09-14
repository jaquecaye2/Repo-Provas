import { prisma } from "../config/database";

export async function findByIdCategory(id: number) {
  const result = await prisma.categories.findUnique({ where: { id } });
  return result;
}