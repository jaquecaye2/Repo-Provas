import { tests } from '@prisma/client';

export type TypeTestData = Omit<tests, 'id'>;
