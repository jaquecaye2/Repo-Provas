import { faker } from '@faker-js/faker';

export default async function userFalseFactory() {
  return {
    email: faker.random.alpha(12),
    password: faker.random.alphaNumeric(5),
  };
}