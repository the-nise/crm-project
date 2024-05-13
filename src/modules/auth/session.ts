import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
@Injectable()
export class Session extends PassportSerializer {
  serializeUser(
    user: User,
    done: (err: Error | null, user: User) => void,
  ): void {
    done(null, user);
  }

  deserializeUser(
    payload: string,
    done: (err: Error | null, payload: string) => void,
  ): void {
    done(null, payload);
  }
}
