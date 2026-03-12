import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for all routes (you can customize this as needed)
  app.setGlobalPrefix("api"); // Set global prefix for all routes (optional)
  await app.listen(3000);
}
bootstrap();
