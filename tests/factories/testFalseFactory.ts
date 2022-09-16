import { faker } from '@faker-js/faker';

export async function TestIncorrectURLFactory() {
  return {
    name: faker.lorem.words(3),
    pdfUrl: faker.random.alphaNumeric(),
    categoryId: Number(faker.finance.amount(7,9,0)),
    teacherDisciplineId: Number(faker.finance.amount(3,8,0))
  };
}

export async function TestIncorrectIdsFactory() {
  return {
    name: faker.lorem.words(3),
    pdfUrl: faker.internet.url(),
    categoryId: 2,
    teacherDisciplineId: 2
  };
}
