import { Controller, Get } from '@nestjs/common';
import { UserService } from './course.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
}
