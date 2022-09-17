import { faker } from '@faker-js/faker';

export async function TestIncorrectURLFactory() {
  return {
    name: faker.lorem.words(3),
    pdfUrl: faker.random.alphaNumeric(),
    categoryId: Number(faker.finance.amount(1,3,0)),
    teacherDisciplineId: Number(faker.finance.amount(1,6,0))
  };
}

export async function TestIncorrectIdsFactory() {
  return {
    name: faker.lorem.words(3),
    pdfUrl: faker.internet.url(),
    categoryId: 999,
    teacherDisciplineId: 999
  };
}
