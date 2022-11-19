import { Module } from '@nestjs/common';
import { UserController } from './course.controller';
import { UserService } from './course.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
