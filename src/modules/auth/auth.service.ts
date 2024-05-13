import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HashAdapter } from 'src/adapters/hash.adapter';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly hashAdapter: HashAdapter,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await this.hashAdapter.verify(user.password, pass))) {
      return user;
    }
    return null;
  }
}
