import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const result = await this.userService.canLogin();
    return res.status(201).json(result);
  }
}
