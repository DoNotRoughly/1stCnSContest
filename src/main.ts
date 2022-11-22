import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  app.enableCors();
  app.setGlobalPrefix('api');
=======
>>>>>>> af119f6 (:twisted_rightwards_arrows: merging)
  await app.listen(3000);
}
bootstrap();
