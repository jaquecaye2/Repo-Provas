import { faker } from '@faker-js/faker';

export default async function userFactory() {
  return {
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(10),
  };
}