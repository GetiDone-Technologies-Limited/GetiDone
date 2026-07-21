import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { AuditInterceptor } from './shared/interceptors/audit.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalInterceptors(new AuditInterceptor());

  // Enable CORS for frontend integration
  app.enableCors();

  // Register the custom HTTP Exception Filter globally to format responses correctly
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`GetiDone backend MVP skeleton running on port ${port}`);
}
bootstrap();
