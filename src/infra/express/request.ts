import { User } from '@/modules/users/entities/user.entity';
import { Request as ExpressRequest } from 'express';

export type Request = ExpressRequest & {
  user: User;
};
