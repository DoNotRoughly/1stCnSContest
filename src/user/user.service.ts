import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async loginInfo(key) {
    // 로그인입니다.
    const result = await this.userRepository.findOneByIdAndPw(key.id, key.pw);
    return result;
  }
}
