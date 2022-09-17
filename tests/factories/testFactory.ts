import { faker } from '@faker-js/faker';

export default async function TestFactory() {
  return {
    name: faker.lorem.words(3),
    pdfUrl: faker.internet.url(),
    categoryId: Number(faker.finance.amount(1,3,0)),
    teacherDisciplineId: Number(faker.finance.amount(1,6,0))
  };
}
