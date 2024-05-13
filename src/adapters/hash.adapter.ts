import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashAdapter {
  async hash(data: string): Promise<string> {
    return argon2.hash(data);
  }

  async verify(hashedData: string, data: string): Promise<boolean> {
    return argon2.verify(hashedData, data);
  }
}
