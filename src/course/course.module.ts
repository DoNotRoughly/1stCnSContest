import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { CourseRepository } from './course.repository';
import { TypeOrmExModule } from 'src/typeorm/typeorm-custom-repository.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { PeriodModule } from 'src/period/period.module';
import { PeriodService } from 'src/period/period.service';
import { UserModule } from 'src/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      Course,
      CourseRepository,
      UserRepository,
      UserModule,
    ]),
    MailerModule.forRoot({
      transport: {
        service: 'google',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'id@gmail.com', // 네이버 아이디
          pass: 'secret_key', // 네이버 비밀번호
        },
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [CourseController],
  providers: [CourseService, UserService, PeriodService],
})
export class CourseModule {}
