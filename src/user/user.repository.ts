import { Repository } from 'typeorm';
import { CustomRepository } from 'src/typeorm/typeorm-custom-repository.decorator';
import { User } from './user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  public async findOneByIdAndPw(id: string, pw: string) {
    return await this.createQueryBuilder('user')
      .select('user')
      .where('user.userId = :id', { id })
      .andWhere('user.pw=:pw', { pw })
      .getOne();
  }
}
