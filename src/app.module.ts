import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
