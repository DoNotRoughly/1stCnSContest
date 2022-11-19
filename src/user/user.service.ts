import { Injectable } from '@nestjs/common';
import { resolveObjectURL } from 'buffer';

@Injectable()
export class UserService {
  async canLogin() {
    return 'Hello Worls!';
  }
}
