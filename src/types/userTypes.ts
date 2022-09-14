import { users } from '@prisma/client';

export type TypeUserData = Omit<users, 'id'>;
