import { Controller, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  // user api router
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    // 로그인 api
    console.log(req.body.params);
    const result = await this.userService.loginInfo(
      req.body.params.userId,
      req.body.params.pw,
    );
    return res.status(result.status).json(result);
  }

  @Patch('apply')
  async apply(@Req() req: Request, @Res() res: Response) {
    // 수강신청 api
    console.log(req.body);
    const result = await this.userService.applyCourse(
      req.body.params.userId,
      req.body.params.course,
    );
    return res.status(result.status).json(result);
  }

  // 살려주세요 암 걸릴거 같아요
  @Patch('cancel')
  async cancel(@Req() req: Request, @Res() res: Response) {
    // 수강신청 api
    const result = await this.userService.applyCourse(
      req.body.params.userId,
      req.body.params.course,
    );
    return res.status(result.status).json(result);
  }
}
