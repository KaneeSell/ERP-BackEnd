import { Role } from 'generated/prisma';

export type UserReqType = {
  user: { userID: number; email: string; role: Role };
};
