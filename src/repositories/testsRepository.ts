import { prisma } from "../config/database";

import { TypeTestData } from "../types/testTypes";

export async function insertTest(testData: TypeTestData) {
    await prisma.tests.create({data: testData})
}
