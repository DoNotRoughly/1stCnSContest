import { Controller, Get, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { identity } from 'rxjs';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  // user api router
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    // 로그인 api
    const result = await this.userService.loginInfo(
      req.body.userId,
      req.body.pw,
    );
    return res.status(result.status).json(result);
  }

  @Patch('apply')
  async apply(@Req() req: Request, @Res() res: Response) {
    // 수강신청 api
    const result = await this.userService.applyCourse(
      req.body.userId,
      req.body.courseId,
    );
    return res.status(result.status).json(result);
  }
}
