import { Injectable } from '@nestjs/common';
import * as randomString from 'randomstring';

@Injectable()
export class RandomAdapter {
  generateString(len = 10) {
    return randomString.generate(len);
  }
}
